import { Collection } from "mongodb";
import { AppConfig } from "../../configuration/configuration";
import { Collections } from "../../database/collection";
import { UrlModel } from "../url-shortening/models/url.model";
import { LogVisitFuncType } from "../stats/log-visit";

export type InvokationContext = {
    uid: string
}

export type UrlInvokationFuncType = (context: InvokationContext) => Promise<UrlModel>

export class UidNotFoundError extends Error {
    constructor(public statusCode: number, public message: string) {
        super(message);
    }
}

export const getUrlInvocationFunc = (dbCollections: Collections, logVisit: LogVisitFuncType): UrlInvokationFuncType => {
    return async (context) => {
        const url = await dbCollections.urls.findOne({ uid: context.uid })
        if (!url) throw new UidNotFoundError(404, "uid not found")
        await logVisit(context.uid)
        return url as unknown as UrlModel
    }
}