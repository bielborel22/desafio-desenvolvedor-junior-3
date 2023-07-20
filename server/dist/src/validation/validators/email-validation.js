"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidation = void 0;
const errors_1 = require("../../presentations/errors");
class EmailValidation {
    constructor(fieldName, emailValidator) {
        this.fieldName = fieldName;
        this.emailValidator = emailValidator;
    }
    validate(data) {
        const isValid = this.emailValidator.validate(data[this.fieldName]);
        if (!isValid) {
            return new errors_1.InvalidParameterError(this.fieldName);
        }
        return null;
    }
}
exports.EmailValidation = EmailValidation;
