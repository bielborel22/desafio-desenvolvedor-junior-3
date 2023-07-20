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
const find_posts_controller_1 = require("./find-posts-controller");
const find_posts_protocols_1 = require("./find-posts-protocols");
const makeFakeRequest = () => ({});
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
const makeFindPostsUseCase = () => {
    class FindPostsUseCaseStub {
        find() {
            return Promise.resolve(makeFakePosts());
        }
    }
    return new FindPostsUseCaseStub();
};
const makeSut = () => {
    const findPostsUseCase = makeFindPostsUseCase();
    const sut = new find_posts_controller_1.FindPostsController(findPostsUseCase);
    return { sut, findPostsUseCaseStub: findPostsUseCase };
};
describe("Find Posts Controller", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllTimers();
    });
    test("Should call FindPostsUseCase", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostsUseCaseStub } = makeSut();
        const findSpy = jest.spyOn(findPostsUseCaseStub, "find");
        yield sut.handle(makeFakeRequest());
        expect(findSpy).toHaveBeenCalled();
    }));
    test("Should return 200 on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, find_posts_protocols_1.ok)(makeFakePosts()));
    }));
    test("Should return 500 if FindPostsUseCase throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostsUseCaseStub } = makeSut();
        jest
            .spyOn(findPostsUseCaseStub, "find")
            .mockReturnValueOnce(Promise.reject(new Error()));
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new Error());
    }));
});
