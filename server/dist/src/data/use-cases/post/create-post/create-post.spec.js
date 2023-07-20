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
const create_post_1 = require("./create-post");
const makeCreatePostRepository = () => {
    class CreatePostRepositoryStub {
        create(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve();
            });
        }
    }
    return new CreatePostRepositoryStub();
};
const makeFakeCreatePostParams = () => ({
    title: "any_title",
    content: "any_content",
    authorId: "any_author_id",
});
const makeSut = () => {
    const createPostRepository = makeCreatePostRepository();
    const sut = new create_post_1.CreatePostUseCase(createPostRepository);
    return {
        sut,
        createPostRepositoryStub: createPostRepository,
    };
};
describe("Create Post UseCase", () => {
    test("should call CreatePostRepository with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, createPostRepositoryStub } = makeSut();
        const createSpy = jest.spyOn(createPostRepositoryStub, "create");
        const postData = {
            title: "any_title",
            content: "any_content",
            authorId: "any_author_id",
        };
        yield sut.create(postData);
        expect(createSpy).toHaveBeenCalledWith(postData);
    }));
    test("should throw if CreatePostRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, createPostRepositoryStub } = makeSut();
        jest
            .spyOn(createPostRepositoryStub, "create")
            .mockRejectedValueOnce(new Error());
        const promise = sut.create(makeFakeCreatePostParams());
        yield expect(promise).rejects.toThrow();
    }));
    test("should not return if CreatePostRepository succeeds", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.create(makeFakeCreatePostParams());
        expect(result).toBeUndefined();
    }));
});
