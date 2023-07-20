"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindPostByIdValidation = void 0;
const validators_1 = require("../../../../../validation/validators");
const makeFindPostByIdValidation = () => {
    return new validators_1.ValidationComposite([new validators_1.RequiredFieldValidation("postId")]);
};
exports.makeFindPostByIdValidation = makeFindPostByIdValidation;
