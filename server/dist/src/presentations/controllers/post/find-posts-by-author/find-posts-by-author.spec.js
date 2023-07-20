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
const find_posts_by_author_1 = require("./find-posts-by-author");
const find_posts_by_author_protocols_1 = require("./find-posts-by-author-protocols");
const makeFakeRequest = () => ({
    params: {
        authorId: "any_author_id",
    },
});
const makeFakePosts = () => [
    {
        id: "any_id",
        title: "any_title",
        content: "any_content",
        authorId: "any_author_id",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "other_id",
        title: "other_title",
        content: "other_content",
        authorId: "other_author_id",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const makeFindPostsByAuthorUseCase = () => {
    class FindPostsByAuthorUseCaseStub {
        findAllByAuthorId(authorId) {
            const postsByAuthor = makeFakePosts().filter((post) => post.authorId === authorId);
            return Promise.resolve(postsByAuthor);
        }
    }
    return new FindPostsByAuthorUseCaseStub();
};
const makeValidation = () => {
    class ValidationStub {
        validate(input) {
            return null;
        }
    }
    return new ValidationStub();
};
const makeSut = () => {
    const findPostsByAuthorUseCaseStub = makeFindPostsByAuthorUseCase();
    const validationStub = makeValidation();
    const sut = new find_posts_by_author_1.FindPostsByAuthorController(validationStub, findPostsByAuthorUseCaseStub);
    return {
        sut,
        findPostsByAuthorUseCaseStub,
        validationStub,
    };
};
describe("Find Posts By Author Controller", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllTimers();
    });
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
            .mockReturnValueOnce(new find_posts_by_author_protocols_1.MissingParameterError("any_field"));
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, find_posts_by_author_protocols_1.badRequest)(new find_posts_by_author_protocols_1.MissingParameterError("any_field")));
    }));
    test("should return 500 if Validation throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, find_posts_by_author_protocols_1.serverError)(new Error()));
    }));
    test("should call FindPostsByAuthorUseCase with correct author id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostsByAuthorUseCaseStub } = makeSut();
        const findAllByAuthorIdSpy = jest.spyOn(findPostsByAuthorUseCaseStub, "findAllByAuthorId");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(findAllByAuthorIdSpy).toHaveBeenCalledWith("any_author_id");
    }));
    test("should return 500 if FindPostsByAuthorUseCase throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostsByAuthorUseCaseStub } = makeSut();
        jest
            .spyOn(findPostsByAuthorUseCaseStub, "findAllByAuthorId")
            .mockRejectedValueOnce(new Error());
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, find_posts_by_author_protocols_1.serverError)(new Error()));
    }));
    test("should return 200 if FindPostsByAuthorUseCase succeeds", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpResponse = yield sut.handle(makeFakeRequest());
        const postsByAuthor = makeFakePosts().filter((post) => post.authorId === "any_author_id");
        expect(httpResponse).toEqual((0, find_posts_by_author_protocols_1.ok)(postsByAuthor));
    }));
});
