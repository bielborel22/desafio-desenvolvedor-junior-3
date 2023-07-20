import { FastifyInstance } from "fastify";
import { adaptRoute } from "../adapters/fastify-route-adapter";
import { makeSignUpController } from "../factories/controllers/sign-up/sign-up-controller-factory";
import { makeSignInController } from "../factories/controllers/sign-in/sign-in-controller-factory";

export default (router: FastifyInstance) => {
  router.post("/signup", adaptRoute(makeSignUpController()));
  router.post("/signin", adaptRoute(makeSignInController()));
};
