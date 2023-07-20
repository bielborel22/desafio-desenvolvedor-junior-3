"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpController = void 0;
const sign_up_controller_1 = require("../../../../presentations/controllers/user/sign-up/sign-up-controller");
const authentication_factory_1 = require("../../use-cases/user/authentication/authentication-factory");
const create_user_factory_1 = require("../../use-cases/user/create-user/create-user-factory");
const sign_up_validation_factory_1 = require("./sign-up-validation-factory");
const makeSignUpController = () => {
    const createAccount = (0, create_user_factory_1.makeCreateUserUseCase)();
    const validation = (0, sign_up_validation_factory_1.makeSignUpValidation)();
    const authentication = (0, authentication_factory_1.makeAuthenticationUseCase)();
    return new sign_up_controller_1.SignUpController(validation, createAccount, authentication);
};
exports.makeSignUpController = makeSignUpController;
