"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../../../../validation/validators");
const sign_in_validation_factory_1 = require("./sign-in-validation-factory");
jest.mock("../../../../validation/validators/validation-composite");
const makeEmailValidator = () => {
    class EmailValidatorStub {
        validate(email) {
            return true;
        }
    }
    return new EmailValidatorStub();
};
describe("SignIn Validation Factory", () => {
    test("should call ValidationComposite with all validations", () => {
        (0, sign_in_validation_factory_1.makeSignInvalidation)();
        expect(validators_1.ValidationComposite).toHaveBeenCalledWith([
            new validators_1.RequiredFieldValidation("email"),
            new validators_1.RequiredFieldValidation("password"),
            new validators_1.EmailValidation("email", makeEmailValidator()),
        ]);
    });
});
