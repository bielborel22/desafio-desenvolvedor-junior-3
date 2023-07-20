"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreatePostValidation = void 0;
const validators_1 = require("../../../../../validation/validators");
const makeCreatePostValidation = () => {
    return new validators_1.ValidationComposite([
        new validators_1.RequiredFieldValidation("title"),
        new validators_1.RequiredFieldValidation("content"),
    ]);
};
exports.makeCreatePostValidation = makeCreatePostValidation;
