"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignInvalidation = void 0;
const email_validator_adapter_1 = require("../../../../utils/email-validator-adapter");
const validators_1 = require("../../../../validation/validators");
const makeSignInvalidation = () => {
    const emailValidator = new email_validator_adapter_1.EmailValidatorAdapter();
    return new validators_1.ValidationComposite([
        new validators_1.RequiredFieldValidation("email"),
        new validators_1.RequiredFieldValidation("password"),
        new validators_1.EmailValidation("email", emailValidator),
    ]);
};
exports.makeSignInvalidation = makeSignInvalidation;
