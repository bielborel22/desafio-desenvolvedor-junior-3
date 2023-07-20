import { SignUpController } from "../../../../presentations/controllers/user/sign-up/sign-up-controller";
import { Controller } from "../../../../presentations/protocols";
import { makeAuthenticationUseCase } from "../../use-cases/user/authentication/authentication-factory";
import { makeCreateUserUseCase } from "../../use-cases/user/create-user/create-user-factory";
import { makeSignUpValidation } from "./sign-up-validation-factory";

export const makeSignUpController = (): Controller => {
  const createAccount = makeCreateUserUseCase();
  const validation = makeSignUpValidation();
  const authentication = makeAuthenticationUseCase();
  return new SignUpController(validation, createAccount, authentication);
};
