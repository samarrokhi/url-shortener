import { from, logger } from 'env-var'
import dotenv from 'dotenv'
dotenv.config({
    override: false
})

const env = from(process.env, {}, logger)

export type AppConfig = {
    server: {
        port: number
    },
    mongoDb: {
        connectionString: string,
        database: string,
        collections: {
            url: string,
            stats: string
        }
    },
    baseUrl: string
}

export const getAppConfig = (): AppConfig => {
    return {
        server: {
            port: env.get('SERVER_PORT').default(3000).required().asInt(),
        },
        mongoDb: {
            connectionString: env.get('MONGO_DB_CONN_STRING').default('mongodb://default:default@localhost:8082').required().asString(),
            database: env.get('MONGO_DB_NAME').default('urlShortener').required().asString(),
            collections: {
                url: env.get('MONGO_DB_URL_COLLECTION_NAME').default('urls').required().asString(),
                stats: env.get('MONGO_DB_STATS_COLLECTION_NAME').default('stats').required().asString()
            }
        },
        baseUrl: env.get('SERVICE_BASE_URL').default('localhost:3000').required().asString()
    }
}
