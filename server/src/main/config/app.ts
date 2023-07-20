import Fastify from "fastify";
import { setupRoutes } from "./routes";
import { setupMiddlewares } from "./middlewares";

export const app = Fastify({
  logger: true,
});
setupMiddlewares(app);
setupRoutes(app);
