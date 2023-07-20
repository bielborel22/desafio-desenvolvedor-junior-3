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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_adapter_1 = require("./jwt-adapter");
const env_1 = require("../../../main/config/env");
jest.mock("jsonwebtoken", () => ({
    sign() {
        return __awaiter(this, void 0, void 0, function* () {
            return "any_token";
        });
    },
    verify() {
        return __awaiter(this, void 0, void 0, function* () {
            return "any_value";
        });
    },
}));
const makeSut = () => {
    return new jwt_adapter_1.JwtAdapter(env_1.environment.jwtSecret);
};
describe("JWT Adapter", () => {
    test("should call sign with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        const signSpy = jest.spyOn(jsonwebtoken_1.default, "sign");
        yield sut.encrypt("any_id");
        expect(signSpy).toHaveBeenCalledWith({
            id: "any_id",
        }, "secret_key");
    }));
    test("should return a token on sign success", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        const accessToken = yield sut.encrypt("any_id");
        expect(accessToken).toBe("any_token");
    }));
    test("should throw if sign throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        jest
            .spyOn(jsonwebtoken_1.default, "sign")
            .mockImplementationOnce(() => Promise.reject(new Error()));
        const promise = sut.encrypt("any_id");
        yield expect(promise).rejects.toThrow();
    }));
});
