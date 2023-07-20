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
const find_post_by_id_1 = require("./find-post-by-id");
const makeFakePost = () => ({
    id: "any_id",
    title: "any_title",
    content: "any_content",
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
const makeSut = () => {
    const findPostByIdRepository = makeFindPostByIdRepository();
    const sut = new find_post_by_id_1.FindPostByIdUseCase(findPostByIdRepository);
    return {
        sut,
        findPostByIdRepositoryStub: findPostByIdRepository,
    };
};
describe("Find Post By Id UseCase", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    beforeAll(() => {
        jest.clearAllTimers();
    });
    test("should call FindPostByIdRepository with correct post id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdRepositoryStub } = makeSut();
        const findByIdSpy = jest.spyOn(findPostByIdRepositoryStub, "findById");
        yield sut.findById("any_id");
        expect(findByIdSpy).toHaveBeenCalledWith("any_id");
    }));
    test("should throw if FindPostByIdRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdRepositoryStub } = makeSut();
        jest
            .spyOn(findPostByIdRepositoryStub, "findById")
            .mockRejectedValueOnce(new Error());
        const promise = sut.findById("any_id");
        yield expect(promise).rejects.toThrow();
    }));
    test("should return null if FindPostByIdRepository returns null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, findPostByIdRepositoryStub } = makeSut();
        jest
            .spyOn(findPostByIdRepositoryStub, "findById")
            .mockResolvedValueOnce(null);
        const result = yield sut.findById("any_id");
        expect(result).toBeNull();
    }));
    test("should return a post on success", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const result = yield sut.findById("any_id");
        expect(result).toEqual(makeFakePost());
    }));
});
