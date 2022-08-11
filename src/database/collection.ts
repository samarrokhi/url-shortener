import { AppConfig } from "../configuration/configuration"
import * as mongoDB from "mongodb"

export type Collections = {
    urls: mongoDB.Collection,
    stats: mongoDB.Collection
}


export const getCollections = async (appConfig: AppConfig): Promise<Collections> => {

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(appConfig.mongoDb.connectionString);

    await client.connect();

    const db: mongoDB.Db = client.db(appConfig.mongoDb.database);

    const collections: Collections = {
        urls: db.collection(appConfig.mongoDb.collections.url),
        stats: db.collection(appConfig.mongoDb.collections.stats)
    }

    console.log(`Successfully connected to database: ${db.databaseName}`);

    return collections
}