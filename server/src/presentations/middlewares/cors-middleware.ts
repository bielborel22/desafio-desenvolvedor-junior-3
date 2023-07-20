import { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";

export const corsMiddleware = (app: FastifyInstance) => {
  app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
};
