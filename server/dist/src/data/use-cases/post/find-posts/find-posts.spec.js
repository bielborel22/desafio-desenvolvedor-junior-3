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
const find_posts_1 = require("./find-posts");
const makeFakePosts = () => [
    {
        id: "any_id",
        title: "any_title",
        content: "any_content",
        authorId: "any_author_id",
        createdAt: new Date(),
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
const makeFindPostsRepository = () => {
    class FindPostsRepositoryStub {
        find() {
            return Promise.resolve(makeFakePosts());
        }
    }
    return new FindPostsRepositoryStub();
};
const makeSut = () => {
    const findPostsRepositoryStub = makeFindPostsRepository();
    const sut = new find_posts_1.FindPostsUseCase(findPostsRepositoryStub);
    return {
        sut,
        findPostsRepositoryStub,
    };
};
describe("Find Posts UseCase", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllTimers();
    });
    test("should call FindPostsRepository", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostsRepositoryStub } = makeSut();
        const findSpy = jest.spyOn(findPostsRepositoryStub, "find");
        yield sut.find();
        expect(findSpy).toHaveBeenCalled();
    }));
    test("should return a list of posts on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const posts = yield sut.find();
        expect(posts).toEqual(makeFakePosts());
    }));
    test("should throw if FindPostsRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostsRepositoryStub } = makeSut();
        jest
            .spyOn(findPostsRepositoryStub, "find")
            .mockRejectedValueOnce(new Error());
        const promise = sut.find();
        yield expect(promise).rejects.toThrow();
    }));
});
