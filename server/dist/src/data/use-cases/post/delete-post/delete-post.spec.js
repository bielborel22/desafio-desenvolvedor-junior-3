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
const delete_post_1 = require("./delete-post");
const makeDeletePostRepository = () => {
    class DeletePostRepositoryStub {
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve(true);
            });
        }
    }
    return new DeletePostRepositoryStub();
};
const makeSut = () => {
    const deletePostRepository = makeDeletePostRepository();
    const sut = new delete_post_1.DeletePostUseCase(deletePostRepository);
    return {
        sut,
        deletePostRepositoryStub: deletePostRepository,
    };
};
describe("Delete Post UseCase", () => {
    test("should call DeletePostRepository with correct id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, deletePostRepositoryStub } = makeSut();
        const deleteSpy = jest.spyOn(deletePostRepositoryStub, "delete");
        yield sut.delete("any_id");
        expect(deleteSpy).toHaveBeenCalledWith("any_id");
    }));
    test("should throw if DeletePostRepository throws", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, deletePostRepositoryStub } = makeSut();
        jest
            .spyOn(deletePostRepositoryStub, "delete")
            .mockRejectedValueOnce(new Error());
        const promise = sut.delete("any_id");
        yield expect(promise).rejects.toThrow();
    }));
    test("should return true if DeletePostRepository returns true", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const deleted = yield sut.delete("any_id");
        expect(deleted).toBe(true);
    }));
    test("should return false if DeletePostRepository returns false", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, deletePostRepositoryStub } = makeSut();
        jest.spyOn(deletePostRepositoryStub, "delete").mockResolvedValueOnce(false);
        const deleted = yield sut.delete("any_id");
        expect(deleted).toBe(false);
    }));
});
