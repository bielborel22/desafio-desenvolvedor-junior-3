"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindPostsByAuthorValidation = void 0;
const validators_1 = require("../../../../../validation/validators");
const makeFindPostsByAuthorValidation = () => {
    return new validators_1.ValidationComposite([new validators_1.RequiredFieldValidation("authorId")]);
};
exports.makeFindPostsByAuthorValidation = makeFindPostsByAuthorValidation;
