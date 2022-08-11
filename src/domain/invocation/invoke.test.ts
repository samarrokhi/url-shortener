import { AppConfig } from "../../configuration/configuration";
import { describe, expect, test } from '@jest/globals'
import { Collections } from "../../database/collection";
import { LogVisitFuncType } from "../stats/log-visit";
import { getUrlInvocationFunc, UidNotFoundError } from "./invoke";

describe("Url invocation", () => {
    test("Invoke for valid url with utm", async () => {

        const dummyGetFindOne = jest.fn((query: unknown) => {
            return {
                _id: "62f3dce0471877bbb4e2896b",
                longUrl: 'http://www.google.com',
                uid: 'some-uid',
                longUrlWithUtm: 'http://www.google.com?source=some-source&&medium=some-medium&&campaign=some-campaign',
                utm: {
                    source: 'some-source',
                    medium: 'some-medium',
                    campaign: 'some-campaign'
                }
            }
        })

        const dummyDbCollections = ({
            urls: {
                findOne: dummyGetFindOne
            }
        } as unknown) as Collections

        const dummyLogVisit: LogVisitFuncType = jest.fn((uid: string) => Promise.resolve())

        const invocationFunc = getUrlInvocationFunc(dummyDbCollections, dummyLogVisit)

        const urlModel = await invocationFunc({ uid: 'some-uid' })

        expect(dummyGetFindOne).toBeCalled()
        expect(dummyLogVisit).toBeCalled()

        expect(urlModel).toMatchObject({
            _id: "62f3dce0471877bbb4e2896b",
            longUrl: 'http://www.google.com',
            uid: 'some-uid',
            longUrlWithUtm: 'http://www.google.com?source=some-source&&medium=some-medium&&campaign=some-campaign',
            utm: {
                source: 'some-source',
                medium: 'some-medium',
                campaign: 'some-campaign'
            }
        })
    })
    test("Invalid url invokation", async () => {

        const dummyGetFindOne = jest.fn((query: unknown) => {
            return null
        })

        const dummyDbCollections = ({
            urls: {
                findOne: dummyGetFindOne
            }
        } as unknown) as Collections

        const dummyLogVisit: LogVisitFuncType = jest.fn((uid: string) => Promise.resolve())

        const invocationFunc = getUrlInvocationFunc(dummyDbCollections, dummyLogVisit)
        try {
            await invocationFunc({ uid: 'some-uid' })
        } catch (err) {
            expect(err).toBeInstanceOf(UidNotFoundError)
        }

        expect(dummyGetFindOne).toBeCalled()
        expect(dummyLogVisit).not.toBeCalled()
    })
})