import { RouteOptions } from "fastify";
import { RequestHandlerType } from "./handlers/types/RequestHandlerType";
import { shortenUrlRequestSchema, shortenUrlResponseSchema } from "./schemas/url-shortening/post-new-url.schema";



export const postNewUrlRoute = (handler: RequestHandlerType): RouteOptions => {
    return {
        method: 'POST',
        url: '/',
        schema: { body: shortenUrlRequestSchema, response: shortenUrlResponseSchema },
        handler: handler
    }
}