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
const auth_middleware_1 = require("./auth-middleware");
const http_helper_1 = require("../helpers/http/http-helper");
const errors_1 = require("../errors");
const makeFakeRequest = () => ({
    headers: {
        ["authorization"]: "any_token",
    },
});
const makeFakeUser = () => ({
    id: "any_id",
    email: "any_email@mail.com",
    password: "any_password",
    accessToken: "any_token",
});
const makeFindUserByAccessToken = () => {
    class FindUserByAccessTokenStub {
        findByAccessToken(accessToken) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(makeFakeUser());
            });
        }
    }
    return new FindUserByAccessTokenStub();
};
const makeSut = () => {
    const findUserByAccessToken = makeFindUserByAccessToken();
    const sut = new auth_middleware_1.AuthMiddleware(findUserByAccessToken);
    return { sut, findUserByAccessTokenStub: findUserByAccessToken };
};
describe("Auth Middleware", () => {
    test("should return 403 no authorization exists in header", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        (_a = httpRequest.headers) === null || _a === void 0 ? true : delete _a["authorization"];
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, http_helper_1.forbidden)(new errors_1.AccessDeniedError()));
    }));
    test("should call FindAccountByAccessToken with correct accessToken", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByAccessTokenStub } = makeSut();
        const httpRequest = makeFakeRequest();
        const findAccountByAccessTokenSpy = jest.spyOn(findUserByAccessTokenStub, "findByAccessToken");
        yield sut.handle(httpRequest);
        expect(findAccountByAccessTokenSpy).toHaveBeenCalledWith("any_token");
    }));
    test("should return 403 if FindAccountByAccessToken returns null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByAccessTokenStub } = makeSut();
        jest
            .spyOn(findUserByAccessTokenStub, "findByAccessToken")
            .mockResolvedValueOnce(null);
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, http_helper_1.forbidden)(new errors_1.AccessDeniedError()));
    }));
    test("should return 200 if FindAccountByAccessToken returns an account", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, http_helper_1.ok)({
            userId: "any_id",
        }));
    }));
    test("should return 500 if FindAccountByAccessToken throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByAccessTokenStub } = makeSut();
        jest
            .spyOn(findUserByAccessTokenStub, "findByAccessToken")
            .mockRejectedValueOnce(new Error());
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, http_helper_1.serverError)(new Error()));
    }));
});
