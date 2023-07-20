import { EmailValidatorAdapter } from "../../../../utils/email-validator-adapter";
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../validation/validators";

export const makeSignInvalidation = (): ValidationComposite => {
  const emailValidator = new EmailValidatorAdapter();
  return new ValidationComposite([
    new RequiredFieldValidation("email"),
    new RequiredFieldValidation("password"),
    new EmailValidation("email", emailValidator),
  ]);
};
