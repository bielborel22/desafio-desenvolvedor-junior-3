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
const update_post_controller_1 = require("./update-post-controller");
const update_post_protocols_1 = require("./update-post-protocols");
const makeFakeRequest = () => ({
    params: {
        postId: "any_id",
    },
    body: {
        title: "any_title",
        content: "any_content",
    },
});
const makeFakeUpdatedPost = () => ({
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
const makeUpdatePostUseCase = () => {
    class UpdatePostUseCaseStub {
        update(params) {
            return Promise.resolve(makeFakeUpdatedPost());
        }
    }
    return new UpdatePostUseCaseStub();
};
const makeSut = () => {
    const validationStub = makeValidation();
    const updatePostUseCase = makeUpdatePostUseCase();
    const sut = new update_post_controller_1.UpdatePostController(validationStub, updatePostUseCase);
    return {
        sut,
        validationStub,
        updatePostUseCaseStub: updatePostUseCase,
    };
};
describe("Update Post Controller", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllTimers();
    });
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
            .mockReturnValueOnce(new update_post_protocols_1.MissingParameterError("any_field"));
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, update_post_protocols_1.badRequest)(new update_post_protocols_1.MissingParameterError("any_field")));
    }));
    test("should return 500 if Validation throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, update_post_protocols_1.serverError)(new Error()));
    }));
    test("should call UpdatePostUseCase with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, updatePostUseCaseStub } = makeSut();
        const updateSpy = jest.spyOn(updatePostUseCaseStub, "update");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(updateSpy).toHaveBeenCalledWith({
            id: httpRequest.params.postId,
            title: httpRequest.body.title,
            content: httpRequest.body.content,
        });
    }));
    test("should return 500 if UpdatePostUseCase throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, updatePostUseCaseStub } = makeSut();
        jest.spyOn(updatePostUseCaseStub, "update").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, update_post_protocols_1.serverError)(new Error()));
    }));
    test("should return 200 if UpdatePostUseCase succeeds", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, update_post_protocols_1.ok)(makeFakeUpdatedPost()));
    }));
});
