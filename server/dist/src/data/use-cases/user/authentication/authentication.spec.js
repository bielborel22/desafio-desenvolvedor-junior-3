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
const authentication_1 = require("./authentication");
const makeFakeAuthData = () => ({
    email: "any_email",
    password: "any_password",
});
const makeFakeUser = () => ({
    id: "any_id",
    email: "any_email",
    password: "hashed_password",
    accessToken: "any_token",
});
const makeHashComparer = () => {
    class HashComparerStub {
        compare(value, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(true);
            });
        }
    }
    return new HashComparerStub();
};
const makeEncrypter = () => {
    class EncrypterStub {
        encrypt(value) {
            return Promise.resolve("access_token");
        }
    }
    return new EncrypterStub();
};
const makeFindUserByEmailRepository = () => {
    class FindUserByEmailRepositoryStub {
        findByEmail(email) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(makeFakeUser());
            });
        }
    }
    return new FindUserByEmailRepositoryStub();
};
const makeUpdateAccessTokenRepository = () => {
    class UpdateAccessTokenRepositoryStub {
        updateAccessToken(id, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve();
            });
        }
    }
    return new UpdateAccessTokenRepositoryStub();
};
const makeSut = () => {
    const findUserByEmailRepository = makeFindUserByEmailRepository();
    const updateAccessTokenRepository = makeUpdateAccessTokenRepository();
    const hashComparer = makeHashComparer();
    const encrypter = makeEncrypter();
    const sut = new authentication_1.AuthenticationUseCase(findUserByEmailRepository, hashComparer, encrypter, updateAccessTokenRepository);
    return {
        sut,
        findUserByEmailRepositoryStub: findUserByEmailRepository,
        hashComparerStub: hashComparer,
        encrypterStub: encrypter,
        updateAccessTokenRepositoryStub: updateAccessTokenRepository,
    };
};
describe("User Authencation UseCase", () => {
    test("should call FindUserByEmailRepository with correct email", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByEmailRepositoryStub } = makeSut();
        const findByEmailSpy = jest.spyOn(findUserByEmailRepositoryStub, "findByEmail");
        const data = makeFakeAuthData();
        yield sut.auth(data);
        expect(findByEmailSpy).toHaveBeenCalledWith(data.email);
    }));
    test("should throw if FindUserByEmailRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByEmailRepositoryStub } = makeSut();
        jest
            .spyOn(findUserByEmailRepositoryStub, "findByEmail")
            .mockRejectedValueOnce(new Error());
        const data = makeFakeAuthData();
        const promise = sut.auth(data);
        yield expect(promise).rejects.toThrow();
    }));
    test("should return null if FindUserByEmailRepository returns null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByEmailRepositoryStub } = makeSut();
        jest
            .spyOn(findUserByEmailRepositoryStub, "findByEmail")
            .mockResolvedValueOnce(null);
        const data = makeFakeAuthData();
        const accessToken = yield sut.auth(data);
        expect(accessToken).toBeNull();
    }));
    test("should call HashComparer with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, hashComparerStub } = makeSut();
        const compareSpy = jest.spyOn(hashComparerStub, "compare");
        const authData = makeFakeAuthData();
        yield sut.auth(authData);
        expect(compareSpy).toHaveBeenCalledWith(authData.password, "hashed_password");
    }));
    test("should throw if HashComparer throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, hashComparerStub } = makeSut();
        jest.spyOn(hashComparerStub, "compare").mockRejectedValueOnce(new Error());
        const authData = makeFakeAuthData();
        const promise = sut.auth(authData);
        yield expect(promise).rejects.toThrow();
    }));
    test("should return null if HashComparer returns false", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, hashComparerStub } = makeSut();
        jest.spyOn(hashComparerStub, "compare").mockResolvedValueOnce(false);
        const authData = makeFakeAuthData();
        const accessToken = yield sut.auth(authData);
        expect(accessToken).toBeNull();
    }));
    test("should call Encrypter with correct user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, encrypterStub } = makeSut();
        const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
        const authData = makeFakeAuthData();
        yield sut.auth(authData);
        expect(encryptSpy).toHaveBeenCalledWith("any_id");
    }));
    test("should throw if Encrypter throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, encrypterStub } = makeSut();
        jest.spyOn(encrypterStub, "encrypt").mockRejectedValueOnce(new Error());
        const authData = makeFakeAuthData();
        const promise = sut.auth(authData);
        yield expect(promise).rejects.toThrow();
    }));
    test("should calls UpdateAccessTokenRepository with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, updateAccessTokenRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, "updateAccessToken");
        const authData = makeFakeAuthData();
        yield sut.auth(authData);
        expect(updateSpy).toHaveBeenCalledWith("any_id", "access_token");
    }));
    test("should throw if UpdateAccessTokenRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, updateAccessTokenRepositoryStub } = makeSut();
        jest
            .spyOn(updateAccessTokenRepositoryStub, "updateAccessToken")
            .mockRejectedValueOnce(new Error());
        const authData = makeFakeAuthData();
        const promise = sut.auth(authData);
        yield expect(promise).rejects.toThrow();
    }));
    test("should return an user on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const authData = makeFakeAuthData();
        const user = yield sut.auth(authData);
        expect(user).toEqual(makeFakeUser());
    }));
});
