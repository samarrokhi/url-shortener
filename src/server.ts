import Fastify, { FastifyInstance, RouteOptions, RouteShorthandOptions } from 'fastify'
import { getAppConfig } from './configuration/configuration'
import { getCollections } from './database/collection'
import { getLogVisitFunc } from './domain/stats/log-visit'
import { getInvokationHandler } from './handlers/invokation-handler'
import { getShorteningUrlHandler } from './handlers/url-shortening-handler'
import { getStatsHandler } from './handlers/stat-handler'
import { postNewUrlRoute } from './routes'

const server: FastifyInstance = Fastify({})
const options: RouteShorthandOptions = {
    logLevel: 'info',
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    pong: {
                        type: 'string'
                    }
                }
            }
        }
    }
}



const app = (async () => {
    console.log('server is starting.')
    const appConfig = getAppConfig()
    const dbCollections = await getCollections(appConfig)
    const newUrlHandler = getShorteningUrlHandler(appConfig, dbCollections)

    server.get('/health', options, async (req, res) => {
        res.status(200).send({ status: 'ok' })
    })

    server.register(
        (app) => app.route(postNewUrlRoute(newUrlHandler)),
        { prefix: '/api/url' }
    )

    server.get("/api/stats/:uid", getStatsHandler(dbCollections))
    server.get("/:uid", getInvokationHandler(dbCollections, getLogVisitFunc(dbCollections)))
    console.log("******* appConfig =>", appConfig)

    const start = async () => {
        try {
            server.log.info({ foo: 'bar' }, 'server is listening',)

            await server.listen({ port: appConfig.server.port, host: '0.0.0.0' })
            const address = server.server.address()
            const port = typeof address === 'string' ? address : address?.port

            server.log.info({ address, port }, 'server is listening',)
        } catch (err) {
            console.log(err)
            process.exit(1)
        }
    }

    await start()
})()