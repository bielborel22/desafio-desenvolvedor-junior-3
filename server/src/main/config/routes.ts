import { FastifyInstance } from "fastify";
import { fastifyUrlData } from "@fastify/url-data";
import { readdir } from "fs/promises";

export const setupRoutes = async (app: FastifyInstance): Promise<void> => {
  const router = app;
  router.register(fastifyUrlData, { prefix: "/api" });

  await readdir(`${__dirname}/../routes`).then(async (files) => {
    for (const file of files) {
      if (file.includes(".test.")) continue;
      await import(`../routes/${file}`).then((module) => {
        module.default(router);
      });
    }
  });
};
