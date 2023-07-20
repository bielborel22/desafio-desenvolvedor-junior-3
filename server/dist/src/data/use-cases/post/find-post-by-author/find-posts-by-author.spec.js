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
const makeFakePosts = () => [
    {
        id: "any_id",
        title: "any_title",
        content: "any_content",
        authorId: "any_author_id",
        createdAt: new Date(),
    },
    {
        id: "another_id",
        title: "another_title",
        content: "another_content",
        authorId: "any_author_id",
        createdAt: new Date(),
    },
    {
        id: "other_id",
        title: "other_title",
        content: "other_content",
        authorId: "other_author_id",
        createdAt: new Date(),
    },
];
const makeFindPostsByAuthorRepository = () => {
    class FindPostsByAuthorRepositoryStub {
        findAllByAuthorId(authorId) {
            return __awaiter(this, void 0, void 0, function* () {
                const postsByAuthorId = makeFakePosts().filter((p) => p.authorId === authorId);
                return Promise.resolve(postsByAuthorId);
            });
        }
    }
    return new FindPostsByAuthorRepositoryStub();
};
const makeSut = () => {
    const findPostsByAuthorRepository = makeFindPostsByAuthorRepository();
    const sut = new find_posts_by_author_1.FindPostsByAuthorUseCase(findPostsByAuthorRepository);
    return {
        sut,
        findPostsByAuthorRepositoryStub: findPostsByAuthorRepository,
    };
};
describe("Find Posts By Author UseCase", () => {
    test("should call FindPostsByAuthorRepository with correct author id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostsByAuthorRepositoryStub } = makeSut();
        const findAllByAuthorIdSpy = jest.spyOn(findPostsByAuthorRepositoryStub, "findAllByAuthorId");
        yield sut.findAllByAuthorId("any_author_id");
        expect(findAllByAuthorIdSpy).toHaveBeenCalledWith("any_author_id");
    }));
    test("should throw if FindPostsByAuthorRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostsByAuthorRepositoryStub } = makeSut();
        jest
            .spyOn(findPostsByAuthorRepositoryStub, "findAllByAuthorId")
            .mockRejectedValueOnce(new Error());
        const promise = sut.findAllByAuthorId("any_author_id");
        yield expect(promise).rejects.toThrow();
    }));
    test("should return an array of posts, of an author, on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const posts = yield sut.findAllByAuthorId("any_author_id");
        const allPostsSameAuthor = posts.every((p) => p.authorId === "any_author_id");
        expect(allPostsSameAuthor).toBe(true);
    }));
});
