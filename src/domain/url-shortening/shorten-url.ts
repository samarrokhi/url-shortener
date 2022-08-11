import { stringify } from "querystring"
import { AppConfig } from "../../configuration/configuration"
import { Collections } from "../../database/collection"
import { UidCreator } from "./create-uid"
import { UrlModel, UtmModel } from "./models/url.model"

export type UrlShorteningContext = {
    longUrl: string,
    utm?: {
        source?: string,
        medium?: string,
        campaign?: string
    }
}
export type UrlShortenerFuncType = (context: UrlShorteningContext) => Promise<UrlModel>

export const getUrlShortenerFunc = (appConfig: AppConfig, uidCreator: UidCreator, dbCollections: Collections): UrlShortenerFuncType => {

    return async (context) => {
        const uid = uidCreator()
        const model = new UrlModel(uid, `${appConfig.baseUrl}/${uid}`, context.longUrl, addUtmToLongUrl(context), context.utm)
        const result = await dbCollections.urls?.insertOne(model)
        model.id = result.insertedId
        return model
    }
}

const addUtmToLongUrl = (context: UrlShorteningContext) => !context.utm
    ? context.longUrl
    : `${context.longUrl}?source=${context.utm.source}&&medium=${context.utm.medium}&&campaign=${context.utm.campaign}`
