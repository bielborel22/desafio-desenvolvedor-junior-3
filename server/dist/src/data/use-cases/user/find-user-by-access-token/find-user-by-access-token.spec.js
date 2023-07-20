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
const find_user_by_access_token_1 = require("./find-user-by-access-token");
const makeFakeUser = () => ({
    id: "valid_id",
    email: "valid_email",
    password: "hashed_password",
});
const makeFindUserByAccessTokenRepository = () => {
    class FindUserByAccessTokenRepositoryStub {
        findByAccessToken(accessToken) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(makeFakeUser());
            });
        }
    }
    return new FindUserByAccessTokenRepositoryStub();
};
const makeSut = () => {
    const findUserByAccessTokenRepository = makeFindUserByAccessTokenRepository();
    const sut = new find_user_by_access_token_1.FindUserByAccessTokenUseCase(findUserByAccessTokenRepository);
    return {
        sut,
        findUserByAccessTokenRepositoryStub: findUserByAccessTokenRepository,
    };
};
describe("Find User By Access Token Use Case", () => {
    test("should call FindUserByAccessTokenRepository with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByAccessTokenRepositoryStub } = makeSut();
        const findSpy = jest.spyOn(findUserByAccessTokenRepositoryStub, "findByAccessToken");
        yield sut.findByAccessToken("any_token");
        expect(findSpy).toHaveBeenCalledWith("any_token");
    }));
    test("should return null if FindUserByAccessTokenRepository returns null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByAccessTokenRepositoryStub } = makeSut();
        jest
            .spyOn(findUserByAccessTokenRepositoryStub, "findByAccessToken")
            .mockResolvedValueOnce(null);
        const user = yield sut.findByAccessToken("any_token");
        expect(user).toBeNull();
    }));
    test("should return an user on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const user = yield sut.findByAccessToken("any_token");
        expect(user).toEqual(makeFakeUser());
    }));
    test("should throw if FindUserByAccessTokenRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByAccessTokenRepositoryStub } = makeSut();
        jest
            .spyOn(findUserByAccessTokenRepositoryStub, "findByAccessToken")
            .mockRejectedValueOnce(new Error());
        const promise = sut.findByAccessToken("any_token");
        yield expect(promise).rejects.toThrow();
    }));
});
