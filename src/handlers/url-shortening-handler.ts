import { AppConfig } from "../configuration/configuration";
import { Collections } from "../database/collection";
import { createUid } from "../domain/url-shortening/create-uid";
import { getUrlShortenerFunc, UrlShorteningContext } from "../domain/url-shortening/shorten-url";
import { RequestHandlerType } from "./types/RequestHandlerType";

type ShorteningUrlBody = {
    targetUrl: string,
    utm: {
        source?: string,
        medium?: string,
        campaign?: string
    } | undefined
}


export const getShorteningUrlHandler = (appConfig: AppConfig, dbCollections: Collections): RequestHandlerType => {
    const urlShortener = getUrlShortenerFunc(appConfig, createUid, dbCollections)
    return async (req, res) => {
        const body = req.body as ShorteningUrlBody
        const context: UrlShorteningContext = {
            longUrl: body.targetUrl,
            utm: body.utm
        }
        const result = await urlShortener(context)
        res.status(201).send({
            url: {
                uid: result.uid,
                long: result.longUrl,
                short: result.shortUrl,
                longWithUtm: result.longUrlWithUtm
            }
        })
    }
}