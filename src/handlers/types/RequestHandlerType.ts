import { FastifyReply, FastifyRequest } from "fastify";

export type RequestHandlerType = (req: FastifyRequest, res: FastifyReply) => Promise<void>
