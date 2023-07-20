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
const create_user_1 = require("./create-user");
const makeCreateUserModel = () => ({
    email: "any_email",
    password: "any_password",
    accessToken: "any_token",
});
const makeFakeUser = () => ({
    id: "any_id",
    email: "any_email",
    password: "any_password",
    accessToken: "any_token",
});
const makeHasher = () => {
    class HasherStub {
        hash(value) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve("hashed_password");
            });
        }
    }
    return new HasherStub();
};
const makeCreateUserRepository = () => {
    class CreateUserRepositoryStub {
        create(user) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(makeFakeUser());
            });
        }
    }
    return new CreateUserRepositoryStub();
};
const makeFindUserByEmailRepository = () => {
    class FindUserByEmailRepositoryStub {
        findByEmail(email) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(null);
            });
        }
    }
    return new FindUserByEmailRepositoryStub();
};
const makeSut = () => {
    const createUserRepository = makeCreateUserRepository();
    const findUserByEmailRepository = makeFindUserByEmailRepository();
    const hasher = makeHasher();
    const sut = new create_user_1.CreateUserUseCase(hasher, createUserRepository, findUserByEmailRepository);
    return {
        sut,
        hasherStub: hasher,
        createUserRepositoryStub: createUserRepository,
        findUserByEmailRepositoryStub: findUserByEmailRepository,
    };
};
describe("Create User Use Case", () => {
    test("should call Hasher with correct password", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, hasherStub } = makeSut();
        const hashSpy = jest.spyOn(hasherStub, "hash");
        const user = makeCreateUserModel();
        yield sut.create(user);
        expect(hashSpy).toHaveBeenCalledWith(user.password);
    }));
    test("should throw if Hasher throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, hasherStub } = makeSut();
        jest.spyOn(hasherStub, "hash").mockRejectedValueOnce(new Error());
        const promise = sut.create(makeCreateUserModel());
        yield expect(promise).rejects.toThrow();
    }));
    test("should call FindUserByEmailRepository with correct email", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByEmailRepositoryStub } = makeSut();
        const findByEmailSpy = jest.spyOn(findUserByEmailRepositoryStub, "findByEmail");
        const user = makeCreateUserModel();
        yield sut.create(user);
        expect(findByEmailSpy).toHaveBeenCalledWith(user.email);
    }));
    test("should throw if FindUserByEmailRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByEmailRepositoryStub } = makeSut();
        jest
            .spyOn(findUserByEmailRepositoryStub, "findByEmail")
            .mockRejectedValueOnce(new Error());
        const promise = sut.create(makeCreateUserModel());
        yield expect(promise).rejects.toThrow();
    }));
    test("should return null if FindUserByEmailRepository returns an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findUserByEmailRepositoryStub } = makeSut();
        jest
            .spyOn(findUserByEmailRepositoryStub, "findByEmail")
            .mockResolvedValueOnce(makeFakeUser());
        const user = yield sut.create(makeCreateUserModel());
        expect(user).toBeNull();
    }));
    test("should call CreateUserRepository with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, createUserRepositoryStub } = makeSut();
        const createUserRepositorySpy = jest.spyOn(createUserRepositoryStub, "create");
        const user = makeCreateUserModel();
        yield sut.create(user);
        user.password = "hashed_password";
        expect(createUserRepositorySpy).toHaveBeenCalledWith(user);
    }));
    test("should throw if CreateUserRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        jest.spyOn(sut, "create").mockRejectedValueOnce(new Error());
        const promise = sut.create(makeCreateUserModel());
        expect(promise).rejects.toThrow();
    }));
    test("should return an user on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const user = yield sut.create(makeCreateUserModel());
        expect(user).toEqual(makeFakeUser());
    }));
});
