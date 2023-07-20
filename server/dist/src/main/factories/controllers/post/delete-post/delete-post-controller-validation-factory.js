"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeletePostValidation = void 0;
const validators_1 = require("../../../../../validation/validators");
const makeDeletePostValidation = () => {
    return new validators_1.ValidationComposite([new validators_1.RequiredFieldValidation("postId")]);
};
exports.makeDeletePostValidation = makeDeletePostValidation;
