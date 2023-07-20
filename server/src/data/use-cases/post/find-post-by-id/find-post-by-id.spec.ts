import { FindPostByIdUseCase } from "./find-post-by-id";
import { FindPostByIdRepository, PostModel } from "./find-post-by-id-protocols";

const makeFakePost = (): PostModel => ({
  id: "any_id",
  title: "any_title",
  content: "any_content",
  authorId: "any_author_id",
  createdAt: new Date(),
});

const makeFindPostByIdRepository = (): FindPostByIdRepository => {
  class FindPostByIdRepositoryStub implements FindPostByIdRepository {
    async findById(id: string): Promise<PostModel | null> {
      return Promise.resolve(makeFakePost());
    }
  }
  return new FindPostByIdRepositoryStub();
};

type SutType = {
  sut: FindPostByIdUseCase;
  findPostByIdRepositoryStub: FindPostByIdRepository;
};

const makeSut = (): SutType => {
  const findPostByIdRepository = makeFindPostByIdRepository();
  const sut = new FindPostByIdUseCase(findPostByIdRepository);
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

  test("should call FindPostByIdRepository with correct post id", async () => {
    const { sut, findPostByIdRepositoryStub } = makeSut();
    const findByIdSpy = jest.spyOn(findPostByIdRepositoryStub, "findById");
    await sut.findById("any_id");
    expect(findByIdSpy).toHaveBeenCalledWith("any_id");
  });

  test("should throw if FindPostByIdRepository throws", async () => {
    const { sut, findPostByIdRepositoryStub } = makeSut();
    jest
      .spyOn(findPostByIdRepositoryStub, "findById")
      .mockRejectedValueOnce(new Error());
    const promise = sut.findById("any_id");
    await expect(promise).rejects.toThrow();
  });

  test("should return null if FindPostByIdRepository returns null", async () => {
    const { sut, findPostByIdRepositoryStub } = makeSut();
    jest
      .spyOn(findPostByIdRepositoryStub, "findById")
      .mockResolvedValueOnce(null);
    const result = await sut.findById("any_id");
    expect(result).toBeNull();
  });

  test("should return a post on success", async () => {
    const { sut } = makeSut();
    const result = await sut.findById("any_id");
    expect(result).toEqual(makeFakePost());
  });
});
