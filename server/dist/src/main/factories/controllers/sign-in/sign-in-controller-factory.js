"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignInController = void 0;
const sign_in_controller_1 = require("../../../../presentations/controllers/user/sign-in/sign-in-controller");
const authentication_factory_1 = require("../../use-cases/user/authentication/authentication-factory");
const sign_in_validation_factory_1 = require("./sign-in-validation-factory");
const makeSignInController = () => {
    const validation = (0, sign_in_validation_factory_1.makeSignInvalidation)();
    const authentication = (0, authentication_factory_1.makeAuthenticationUseCase)();
    return new sign_in_controller_1.SignInController(validation, authentication);
};
exports.makeSignInController = makeSignInController;
