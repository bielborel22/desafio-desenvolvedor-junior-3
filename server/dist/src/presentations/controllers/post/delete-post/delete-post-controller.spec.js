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
const delete_post_controller_protocols_1 = require("./delete-post-controller-protocols");
const delete_post_controller_1 = require("./delete-post-controller");
const makeFakeRequest = () => ({
    params: {
        postId: "any_id",
    },
});
const makeFakePost = () => ({
    id: "any_id",
    title: "any_title",
    content: "any_content",
    authorId: "any_author_id",
    createdAt: new Date(),
    updatedAt: new Date(),
});
const makeValidation = () => {
    class ValidationStub {
        validate(input) {
            return null;
        }
    }
    return new ValidationStub();
};
const makeDeletePostUseCase = () => {
    class DeletePostUseCaseStub {
        delete(id) {
            return Promise.resolve(true);
        }
    }
    return new DeletePostUseCaseStub();
};
const makeFindPostByIdUseCase = () => {
    class FindPostByIdUseCaseStub {
        findById(id) {
            return Promise.resolve(makeFakePost());
        }
    }
    return new FindPostByIdUseCaseStub();
};
const makeSut = () => {
    const validationStub = makeValidation();
    const deletePostUseCase = makeDeletePostUseCase();
    const findPostByIdUseCase = makeFindPostByIdUseCase();
    const sut = new delete_post_controller_1.DeletePostController(validationStub, findPostByIdUseCase, deletePostUseCase);
    return {
        sut,
        validationStub,
        deletePostUseCaseStub: deletePostUseCase,
        findPostByIdUseCaseStub: findPostByIdUseCase,
    };
};
describe("Delete Post Controller", () => {
    test("should call Validation with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, "validate");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.params);
    }));
    test("should return 400 if Validation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest
            .spyOn(validationStub, "validate")
            .mockReturnValueOnce(new delete_post_controller_protocols_1.MissingParameterError("any_field"));
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, delete_post_controller_protocols_1.badRequest)(new delete_post_controller_protocols_1.MissingParameterError("any_field")));
    }));
    test("should return 500 if Validation throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, delete_post_controller_protocols_1.serverError)(new Error()));
    }));
    test("should call FindPostByIdUseCase with correct post id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdUseCaseStub } = makeSut();
        const findSpy = jest.spyOn(findPostByIdUseCaseStub, "findById");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(findSpy).toHaveBeenCalledWith(httpRequest.params.postId);
    }));
    test("should return 400 if FindPostByIdUseCase returns null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdUseCaseStub } = makeSut();
        jest.spyOn(findPostByIdUseCaseStub, "findById").mockResolvedValueOnce(null);
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, delete_post_controller_protocols_1.badRequest)(new delete_post_controller_protocols_1.InvalidParameterError("postId")));
    }));
    test("should return 500 if FindPostByIdUseCase throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdUseCaseStub } = makeSut();
        jest
            .spyOn(findPostByIdUseCaseStub, "findById")
            .mockRejectedValueOnce(new Error());
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, delete_post_controller_protocols_1.serverError)(new Error()));
    }));
    test("should call DeletePostUseCase with correct post id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, deletePostUseCaseStub } = makeSut();
        const deleteSpy = jest.spyOn(deletePostUseCaseStub, "delete");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(deleteSpy).toHaveBeenCalledWith(httpRequest.params.postId);
    }));
    test("should return 500 if DeletePostUseCase throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, deletePostUseCaseStub } = makeSut();
        jest
            .spyOn(deletePostUseCaseStub, "delete")
            .mockRejectedValueOnce(new Error());
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, delete_post_controller_protocols_1.serverError)(new Error()));
    }));
    test("should return 200 if DeletePostUseCase returns true", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse.statusCode).toBe(200);
    }));
    test("should return 400 if DeletePostUseCase returns false", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, deletePostUseCaseStub } = makeSut();
        jest.spyOn(deletePostUseCaseStub, "delete").mockResolvedValueOnce(false);
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, delete_post_controller_protocols_1.badRequest)(new delete_post_controller_protocols_1.InvalidParameterError("postId")));
    }));
});
