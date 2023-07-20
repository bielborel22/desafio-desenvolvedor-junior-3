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
const email_validation_1 = require("./email-validation");
const makeEmailValidator = () => {
    class EmailValidatorStub {
        validate(email) {
            return true;
        }
    }
    return new EmailValidatorStub();
};
const makeSut = () => {
    const emailValidatorStub = makeEmailValidator();
    const sut = new email_validation_1.EmailValidation("email", emailValidatorStub);
    return {
        sut,
        emailValidatorStub,
    };
};
describe("Email Validation", () => {
    test("should return an error if EmailValidator returns false", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, emailValidatorStub } = makeSut();
        jest.spyOn(emailValidatorStub, "validate").mockReturnValueOnce(false);
        const error = sut.validate({
            email: "any_email@mail.com",
        });
        expect(error).toEqual(new errors_1.InvalidParameterError("email"));
    }));
    test("should call EmailValidator with correct email", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, emailValidatorStub } = makeSut();
        const isValidSpy = jest.spyOn(emailValidatorStub, "validate");
        sut.validate({
            email: "any_email@mail.com",
        });
        expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
    }));
    test("should return nothing if validation succeeds", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const error = sut.validate({
            email: "any_email@mail.com",
        });
        expect(error).toBeNull();
    }));
    test("should return throw if EmailValidator throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, emailValidatorStub } = makeSut();
        jest.spyOn(emailValidatorStub, "validate").mockImplementationOnce(() => {
            throw new Error();
        });
        expect(sut.validate).toThrow();
    }));
});
