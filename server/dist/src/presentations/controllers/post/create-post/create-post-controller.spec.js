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
const create_post_controller_1 = require("./create-post-controller");
const create_post_controller_protocols_1 = require("./create-post-controller-protocols");
const makeFakeRequest = () => ({
    body: {
        title: "any_title",
        content: "any_content",
    },
    userId: "any_user_id",
});
const makeValidation = () => {
    class ValidationStub {
        validate(data) {
            return null;
        }
    }
    return new ValidationStub();
};
const makeCreatePostUseCase = () => {
    class CreatePostUseCaseStub {
        create(data) {
            return Promise.resolve();
        }
    }
    return new CreatePostUseCaseStub();
};
const makeSut = () => {
    const validation = makeValidation();
    const createPost = makeCreatePostUseCase();
    const sut = new create_post_controller_1.CreatePostController(validation, createPost);
    return {
        sut,
        validationStub: validation,
        createPostStub: createPost,
    };
};
describe("Create Post Controller", () => {
    test("should call Validation with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, "validate");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    }));
    test("should return 500 if Validation throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, create_post_controller_protocols_1.serverError)(new Error()));
    }));
    test("should return 400 if Validation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest
            .spyOn(validationStub, "validate")
            .mockReturnValueOnce(new create_post_controller_protocols_1.MissingParameterError("any_field"));
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, create_post_controller_protocols_1.badRequest)(new create_post_controller_protocols_1.MissingParameterError("any_field")));
    }));
    test("should call CreatePostUseCase with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, createPostStub } = makeSut();
        const createSpy = jest.spyOn(createPostStub, "create");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(createSpy).toHaveBeenCalledWith({
            title: "any_title",
            content: "any_content",
            authorId: "any_user_id",
        });
    }));
    test("should return 500 if CreatePostUseCase throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, createPostStub } = makeSut();
        jest.spyOn(createPostStub, "create").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, create_post_controller_protocols_1.serverError)(new Error()));
    }));
    test("should return 201 on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, create_post_controller_protocols_1.created)({}));
    }));
});
