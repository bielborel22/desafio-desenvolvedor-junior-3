import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify";
import { AuthMiddleware } from "../../presentations/middlewares/auth-middleware";

export const adaptMiddleware = (middleware: AuthMiddleware) => {
  return async (
    req: FastifyRequest,
    rep: FastifyReply,
    next: DoneFuncWithErrOrRes
  ) => {
    const httpRequest = {
      headers: req.headers,
    };
    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      return;
    }
    rep.status(httpResponse.statusCode).send({
      error: httpResponse.body.message,
    });
  };
};
