import { Collection } from "mongodb";
import { Collections } from "../../database/collection";
import { StatModel } from "./models/stat.model";

export type GetStatContext = {
    uid: string
}

export type GetStatFuncType = (context: GetStatContext) => Promise<StatModel>

export const getStatFunc = (dbCollections: Collections): GetStatFuncType => {
    return async (context) => {
        const visits = await dbCollections.stats.countDocuments({ uid: context.uid })
        return new StatModel(visits)
    }
}