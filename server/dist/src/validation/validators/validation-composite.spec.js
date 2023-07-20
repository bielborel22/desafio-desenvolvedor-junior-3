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
const validation_composite_1 = require("./validation-composite");
const makeValidation = () => {
    class ValidationStub {
        validate(data) {
            return null;
        }
    }
    return new ValidationStub();
};
const makeSut = () => {
    const validationStubs = [makeValidation(), makeValidation()];
    const sut = new validation_composite_1.ValidationComposite(validationStubs);
    return {
        sut,
        validationStubs,
    };
};
describe("Validation Composite", () => {
    test("should return an error if any validation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStubs } = makeSut();
        jest
            .spyOn(validationStubs[0], "validate")
            .mockReturnValueOnce(new errors_1.MissingParameterError("email"));
        const error = sut.validate({
            email: "any_email@mail.com",
        });
        expect(error).toEqual(new errors_1.MissingParameterError("email"));
    }));
    test("should return the first error if more than one validation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStubs } = makeSut();
        jest.spyOn(validationStubs[0], "validate").mockReturnValueOnce(new Error());
        jest
            .spyOn(validationStubs[1], "validate")
            .mockReturnValueOnce(new errors_1.MissingParameterError("email"));
        const error = sut.validate({
            email: "any_email@mail.com",
        });
        expect(error).toEqual(new Error());
    }));
    test("should return nothing if validation succeeds", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const error = sut.validate({
            email: "any_email@mail.com",
        });
        expect(error).toBeNull();
    }));
});
