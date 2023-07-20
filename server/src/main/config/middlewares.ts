import { FastifyInstance } from "fastify";
import { corsMiddleware } from "../../presentations/middlewares/cors-middleware";

export const setupMiddlewares = (app: FastifyInstance) => {
  corsMiddleware(app);
};
