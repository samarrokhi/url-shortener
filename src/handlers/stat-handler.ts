import { Collections } from "../database/collection"
import { GetStatContext, getStatFunc } from "../domain/stats/get-stats"
import { RequestHandlerType } from "./types/RequestHandlerType"

export const getStatsHandler = (dbCollections: Collections): RequestHandlerType => {
    const getStatsFunc = getStatFunc(dbCollections)
    return async (req, res) => {
        const { uid } = req.params as { uid: string }
        const context: GetStatContext = {
            uid: uid
        }
        const { visits } = await getStatsFunc(context)
        res.status(200).send({ uid, visits })
    }
}