import { AppConfig } from "../../configuration/configuration"
import { Collections } from "../../database/collection"
import { UrlVisit } from "./models/visit.model"

export type LogVisitFuncType = (uid: string) => Promise<void>

export const getLogVisitFunc = (dbCollection: Collections): LogVisitFuncType => {
    return async (uid) => {
        await dbCollection.stats.insertOne(new UrlVisit(uid, new Date()))
    }
}