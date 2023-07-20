"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_route_adapter_1 = require("../adapters/fastify-route-adapter");
const sign_up_controller_factory_1 = require("../factories/controllers/sign-up/sign-up-controller-factory");
const sign_in_controller_factory_1 = require("../factories/controllers/sign-in/sign-in-controller-factory");
exports.default = (router) => {
    router.post("/signup", (0, fastify_route_adapter_1.adaptRoute)((0, sign_up_controller_factory_1.makeSignUpController)()));
    router.post("/signin", (0, fastify_route_adapter_1.adaptRoute)((0, sign_in_controller_factory_1.makeSignInController)()));
};
