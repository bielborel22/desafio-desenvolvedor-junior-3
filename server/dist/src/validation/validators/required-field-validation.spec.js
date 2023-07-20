"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../presentations/errors");
const required_field_validation_1 = require("./required-field-validation");
const makeSut = (field) => {
    return new required_field_validation_1.RequiredFieldValidation(field);
};
describe("RequiredField Validation", () => {
    test("should return an MissingParamError if validation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut("email");
        const error = sut.validate({
            email: "",
        });
        expect(error).toEqual(new errors_1.MissingParameterError("email"));
    }));
    test("should return nothing if validation succeeds", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut("email");
        const error = sut.validate({
            email: "any_email@mail.com",
        });
        expect(error).toBeNull();
    }));
});
