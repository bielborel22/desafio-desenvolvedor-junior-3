import { DeletePostUseCase } from "./delete-post";
import { DeletePostRepository, PostModel } from "./delete-post-protocols";

const makeDeletePostRepository = (): DeletePostRepository => {
  class DeletePostRepositoryStub implements DeletePostRepository {
    async delete(id: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new DeletePostRepositoryStub();
};

type SutType = {
  sut: DeletePostUseCase;
  deletePostRepositoryStub: DeletePostRepository;
};

const makeSut = (): SutType => {
  const deletePostRepository = makeDeletePostRepository();
  const sut = new DeletePostUseCase(deletePostRepository);
  return {
    sut,
    deletePostRepositoryStub: deletePostRepository,
  };
};

describe("Delete Post UseCase", () => {
  test("should call DeletePostRepository with correct id", async () => {
    const { sut, deletePostRepositoryStub } = makeSut();
    const deleteSpy = jest.spyOn(deletePostRepositoryStub, "delete");
    await sut.delete("any_id");
    expect(deleteSpy).toHaveBeenCalledWith("any_id");
  });

  test("should throw if DeletePostRepository throws", async () => {
    const { sut, deletePostRepositoryStub } = makeSut();
    jest
      .spyOn(deletePostRepositoryStub, "delete")
      .mockRejectedValueOnce(new Error());
    const promise = sut.delete("any_id");
    await expect(promise).rejects.toThrow();
  });

  test("should return true if DeletePostRepository returns true", async () => {
    const { sut } = makeSut();
    const deleted = await sut.delete("any_id");
    expect(deleted).toBe(true);
  });

  test("should return false if DeletePostRepository returns false", async () => {
    const { sut, deletePostRepositoryStub } = makeSut();
    jest.spyOn(deletePostRepositoryStub, "delete").mockResolvedValueOnce(false);
    const deleted = await sut.delete("any_id");
    expect(deleted).toBe(false);
  });
});
