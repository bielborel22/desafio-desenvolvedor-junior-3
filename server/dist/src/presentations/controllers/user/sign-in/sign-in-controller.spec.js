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
const sign_in_controller_protocols_1 = require("../sign-in/sign-in-controller-protocols");
const sign_in_controller_1 = require("./sign-in-controller");
const makeFakeRequest = () => ({
    body: {
        email: "any_email@mail.com",
        password: "any_password",
    },
});
const makeFakeUser = () => ({
    id: "any_id",
    email: "any_email@mail.com",
    password: "any_password",
    accessToken: "any_token",
});
const makeAuthentication = () => {
    class AuthenticationStub {
        auth(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(makeFakeUser());
            });
        }
    }
    return new AuthenticationStub();
};
const makeValidation = () => {
    class ValidationStub {
        validate(data) {
            return null;
        }
    }
    return new ValidationStub();
};
const makeSut = () => {
    const validation = makeValidation();
    const authentication = makeAuthentication();
    const sut = new sign_in_controller_1.SignInController(validation, authentication);
    return {
        sut,
        validationStub: validation,
        authenticationStub: authentication,
    };
};
describe("Sign In Controller", () => {
    test("should call Validation with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, "validate");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    }));
    test("should return 400 if Validation returns an error", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest
            .spyOn(validationStub, "validate")
            .mockReturnValueOnce(new sign_in_controller_protocols_1.MissingParameterError("any_field"));
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new sign_in_controller_protocols_1.MissingParameterError("any_field"));
    }));
    test("should return 500 if Validation throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new Error());
    }));
    test("should call Authentication with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, authenticationStub } = makeSut();
        const authSpy = jest.spyOn(authenticationStub, "auth");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(authSpy).toHaveBeenCalledWith(httpRequest.body);
    }));
    test("should return 401 if Authentication returns null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, authenticationStub } = makeSut();
        jest
            .spyOn(authenticationStub, "auth")
            .mockReturnValueOnce(Promise.resolve(null));
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, sign_in_controller_protocols_1.unauthorized)());
    }));
    test("should return 500 if Authentication throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, authenticationStub } = makeSut();
        jest.spyOn(authenticationStub, "auth").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, sign_in_controller_protocols_1.serverError)(new Error()));
    }));
    test("should return 200 on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, sign_in_controller_protocols_1.ok)({ user: makeFakeUser() }));
    }));
});
