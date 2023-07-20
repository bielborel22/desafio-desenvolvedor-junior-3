import { EmailValidator } from "../../../../validation/protocols/email-validator";
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../validation/validators";
import { makeSignInvalidation } from "./sign-in-validation-factory";

jest.mock("../../../../validation/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    validate(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe("SignIn Validation Factory", () => {
  test("should call ValidationComposite with all validations", () => {
    makeSignInvalidation();
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation("email"),
      new RequiredFieldValidation("password"),
      new EmailValidation("email", makeEmailValidator()),
    ]);
  });
});
