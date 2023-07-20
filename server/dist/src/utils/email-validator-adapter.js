"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidatorAdapter = void 0;
class EmailValidatorAdapter {
    validate(email) {
        const VALIDATE_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return VALIDATE_EMAIL_REGEX.test(email);
    }
}
exports.EmailValidatorAdapter = EmailValidatorAdapter;
