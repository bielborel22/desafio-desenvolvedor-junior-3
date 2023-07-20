"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdatePostControllerValidation = void 0;
const validators_1 = require("../../../../../validation/validators");
const makeUpdatePostControllerValidation = () => {
    return new validators_1.ValidationComposite([
        new validators_1.RequiredFieldValidation("title"),
        new validators_1.RequiredFieldValidation("content"),
    ]);
};
exports.makeUpdatePostControllerValidation = makeUpdatePostControllerValidation;
