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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcrypt_adapter_1 = require("./bcrypt-adapter");
jest.mock("bcrypt", () => ({
    hash() {
        return __awaiter(this, void 0, void 0, function* () {
            return "hash";
        });
    },
    compare() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    },
}));
const SALT = 12;
const makeSut = () => {
    return new bcrypt_adapter_1.BcryptAdapter(SALT);
};
describe("Bcrypt Adapter", () => {
    test("should call hash with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const hashSpy = jest.spyOn(bcrypt_1.default, "hash");
        const sut = makeSut();
        yield sut.hash("any_value");
        expect(hashSpy).toHaveBeenCalledWith("any_value", SALT);
    }));
    test("should return a valid hash on hash success", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        const hash = yield sut.hash("any_value");
        expect(hash).toBe("hash");
    }));
    test("should throw if hash throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        jest
            .spyOn(bcrypt_1.default, "hash")
            .mockImplementationOnce(() => Promise.reject(new Error()));
        const promise = sut.hash("any_value");
        yield expect(promise).rejects.toThrow();
    }));
    test("should call compare with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const compareSpy = jest.spyOn(bcrypt_1.default, "compare");
        const sut = makeSut();
        yield sut.compare("any_value", "any_hash");
        expect(compareSpy).toHaveBeenCalledWith("any_value", "any_hash");
    }));
    test("should return true when compare succeeds", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        const isValid = yield sut.compare("any_value", "any_hash");
        expect(isValid).toBe(true);
    }));
    test("should return false when compare fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        jest
            .spyOn(bcrypt_1.default, "compare")
            .mockImplementationOnce(() => Promise.resolve(false));
        const isValid = yield sut.compare("any_value", "any_hash");
        expect(isValid).toBe(false);
    }));
    test("should throw if compare throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        jest
            .spyOn(bcrypt_1.default, "compare")
            .mockImplementationOnce(() => Promise.reject(new Error()));
        const promise = sut.compare("any_value", "any_hash");
        yield expect(promise).rejects.toThrow();
    }));
});
