import { AppConfig } from "../configuration/configuration"
import { Collections } from "../database/collection"
import { getUrlInvocationFunc, InvokationContext, UidNotFoundError } from "../domain/invocation/invoke"
import { LogVisitFuncType } from "../domain/stats/log-visit"
import { RequestHandlerType } from "./types/RequestHandlerType"

export const getInvokationHandler = (dbCollections: Collections, logVisit: LogVisitFuncType): RequestHandlerType => {
    const urlInvokationFunc = getUrlInvocationFunc(dbCollections, logVisit)
    return async (req, res) => {
        try {
            const { uid } = req.params as { uid: string }
            const context: InvokationContext = {
                uid: uid
            }
            const { longUrlWithUtm } = await urlInvokationFunc(context)
            res.redirect(302, longUrlWithUtm).send()
        }
        catch (err) {
            if (err instanceof UidNotFoundError)
                res.status(404).send("Url not found!")
            else
                res.status(500).send("Unexpected error happened.")
        }
    }
}