import { SignInController } from "../../../../presentations/controllers/user/sign-in/sign-in-controller";
import { Controller } from "../../../../presentations/protocols";
import { makeAuthenticationUseCase } from "../../use-cases/user/authentication/authentication-factory";
import { makeSignInvalidation } from "./sign-in-validation-factory";

export const makeSignInController = (): Controller => {
  const validation = makeSignInvalidation();
  const authentication = makeAuthenticationUseCase();
  return new SignInController(validation, authentication);
};
