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
const find_post_by_id_controller_1 = require("./find-post-by-id-controller");
const find_post_by_id_controller_protocols_1 = require("./find-post-by-id-controller-protocols");
const makeFakeRequest = () => ({
    params: {
        postId: "any_id",
    },
});
const makeValidation = () => {
    class ValidationStub {
        validate(input) {
            return null;
        }
    }
    return new ValidationStub();
};
const makeFakePost = () => ({
    id: "any_id",
    title: "any_title",
    content: "any_content",
    authorId: "any_author_id",
    createdAt: new Date(),
    updatedAt: new Date(),
});
const makeFindPostByIdUseCase = () => {
    class FindPostByIdUseCaseStub {
        findById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(makeFakePost());
            });
        }
    }
    return new FindPostByIdUseCaseStub();
};
const makeSut = () => {
    const findPostByIdUseCase = makeFindPostByIdUseCase();
    const validation = makeValidation();
    const sut = new find_post_by_id_controller_1.FindPostByIdController(validation, findPostByIdUseCase);
    return {
        sut,
        findPostByIdUseCaseStub: findPostByIdUseCase,
        validationStub: validation,
    };
};
describe("Find Post By Id Controller", () => {
    test("should call Validation with correct values", () => {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, "validate");
        const httpRequest = makeFakeRequest();
        sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.params);
    });
    test("should return 400 if Validation returns an error", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest
            .spyOn(validationStub, "validate")
            .mockReturnValueOnce(new find_post_by_id_controller_protocols_1.MissingParameterError("any_field"));
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, find_post_by_id_controller_protocols_1.badRequest)(new find_post_by_id_controller_protocols_1.MissingParameterError("any_field")));
    }));
    test("should return 500 if Validation throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, find_post_by_id_controller_protocols_1.serverError)(new Error()));
    }));
    test("should call FindPostByIdUseCase with correct id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdUseCaseStub } = makeSut();
        const findByIdSpy = jest.spyOn(findPostByIdUseCaseStub, "findById");
        yield sut.handle(makeFakeRequest());
        expect(findByIdSpy).toHaveBeenCalledWith("any_id");
    }));
    test("should return 500 if FindPostByIdUseCase throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdUseCaseStub } = makeSut();
        jest
            .spyOn(findPostByIdUseCaseStub, "findById")
            .mockRejectedValueOnce(new Error());
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, find_post_by_id_controller_protocols_1.serverError)(new Error()));
    }));
    test("should return 200 if FindPostByIdUseCase succeeds", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, find_post_by_id_controller_protocols_1.ok)(makeFakePost()));
    }));
});
