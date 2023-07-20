import { Controller } from "../../presentations/protocols";
import { FastifyReply, FastifyRequest } from "fastify";

export const adaptRoute = (controller: Controller) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpRequest = {
      body: request.body,
      params: request.params,
      userId: request.userId,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }
    return reply
      .status(httpResponse.statusCode)
      .send({ error: httpResponse.body.message });
  };
};
