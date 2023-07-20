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
const update_post_1 = require("./update-post");
const makeFakePost = () => ({
    id: "any_id",
    title: "any_title",
    content: "any_content",
    authorId: "any_author_id",
    createdAt: new Date(),
});
const makeFakeUpdatedPost = () => ({
    id: "any_id",
    title: "any_updated_title",
    content: "any_updated_title",
    authorId: "any_author_id",
    createdAt: new Date(),
});
const makeFindPostByIdRepository = () => {
    class FindPostByIdRepositoryStub {
        findById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(makeFakePost());
            });
        }
    }
    return new FindPostByIdRepositoryStub();
};
const makeUpdatePostRepository = () => {
    class UpdatePostRepositoryStub {
        update(params) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(makeFakeUpdatedPost());
            });
        }
    }
    return new UpdatePostRepositoryStub();
};
const makeSut = () => {
    const findPostByIdRepository = makeFindPostByIdRepository();
    const updatePostRepository = makeUpdatePostRepository();
    const sut = new update_post_1.UpdatePostUseCase(findPostByIdRepository, updatePostRepository);
    return {
        sut,
        findPostByIdRepositoryStub: findPostByIdRepository,
        updatePostRepositoryStub: updatePostRepository,
    };
};
describe("Update Post UseCase", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllTimers();
    });
    test("should call FindPostByIdRepository with correct post id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdRepositoryStub } = makeSut();
        const findByIdSpy = jest.spyOn(findPostByIdRepositoryStub, "findById");
        yield sut.update({ id: "any_id" });
        expect(findByIdSpy).toHaveBeenCalledWith("any_id");
    }));
    test("should throw if FindPostByIdRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdRepositoryStub } = makeSut();
        jest
            .spyOn(findPostByIdRepositoryStub, "findById")
            .mockRejectedValueOnce(new Error());
        const promise = sut.update({ id: "any_id" });
        yield expect(promise).rejects.toThrow();
    }));
    test("should return null if FindPostByIdRepository returns null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdRepositoryStub } = makeSut();
        jest
            .spyOn(findPostByIdRepositoryStub, "findById")
            .mockResolvedValueOnce(null);
        const post = yield sut.update({ id: "any_id" });
        expect(post).toBeNull();
    }));
    test("should call UpdatePostRepository with correct values", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, updatePostRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(updatePostRepositoryStub, "update");
        const updatePostData = {
            id: "any_id",
            title: "any_title_second",
            content: "any_content_second",
        };
        yield sut.update(updatePostData);
        expect(updateSpy).toHaveBeenCalledWith(updatePostData);
    }));
    test("should throw if UpdatePostRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, updatePostRepositoryStub } = makeSut();
        jest
            .spyOn(updatePostRepositoryStub, "update")
            .mockRejectedValueOnce(new Error());
        const promise = sut.update({ id: "any_id" });
        yield expect(promise).rejects.toThrow();
    }));
    test("should return the updated post on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const post = yield sut.update({ id: "any_id" });
        expect(post).toEqual(makeFakeUpdatedPost());
    }));
});
