import { UpdatePostUseCase } from "./update-post";
import {
  FindPostByIdRepository,
  PostModel,
  UpdatePostParams,
  UpdatePostRepository,
} from "./update-post-protocols";

const makeFakePost = (): PostModel => ({
  id: "any_id",
  title: "any_title",
  content: "any_content",
  authorId: "any_author_id",
  createdAt: new Date(),
});

const makeFakeUpdatedPost = (): PostModel => ({
  id: "any_id",
  title: "any_updated_title",
  content: "any_updated_title",
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

const makeUpdatePostRepository = (): UpdatePostRepository => {
  class UpdatePostRepositoryStub implements UpdatePostRepository {
    async update(params: UpdatePostParams): Promise<PostModel> {
      return Promise.resolve(makeFakeUpdatedPost());
    }
  }
  return new UpdatePostRepositoryStub();
};

type SutType = {
  sut: UpdatePostUseCase;
  findPostByIdRepositoryStub: FindPostByIdRepository;
  updatePostRepositoryStub: UpdatePostRepository;
};

const makeSut = (): SutType => {
  const findPostByIdRepository = makeFindPostByIdRepository();
  const updatePostRepository = makeUpdatePostRepository();
  const sut = new UpdatePostUseCase(
    findPostByIdRepository,
    updatePostRepository
  );

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

  test("should call FindPostByIdRepository with correct post id", async () => {
    const { sut, findPostByIdRepositoryStub } = makeSut();
    const findByIdSpy = jest.spyOn(findPostByIdRepositoryStub, "findById");
    await sut.update({ id: "any_id" });
    expect(findByIdSpy).toHaveBeenCalledWith("any_id");
  });

  test("should throw if FindPostByIdRepository throws", async () => {
    const { sut, findPostByIdRepositoryStub } = makeSut();
    jest
      .spyOn(findPostByIdRepositoryStub, "findById")
      .mockRejectedValueOnce(new Error());
    const promise = sut.update({ id: "any_id" });
    await expect(promise).rejects.toThrow();
  });

  test("should return null if FindPostByIdRepository returns null", async () => {
    const { sut, findPostByIdRepositoryStub } = makeSut();
    jest
      .spyOn(findPostByIdRepositoryStub, "findById")
      .mockResolvedValueOnce(null);
    const post = await sut.update({ id: "any_id" });
    expect(post).toBeNull();
  });

  test("should call UpdatePostRepository with correct values", async () => {
    const { sut, updatePostRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(updatePostRepositoryStub, "update");
    const updatePostData = {
      id: "any_id",
      title: "any_title_second",
      content: "any_content_second",
    };
    await sut.update(updatePostData);
    expect(updateSpy).toHaveBeenCalledWith(updatePostData);
  });

  test("should throw if UpdatePostRepository throws", async () => {
    const { sut, updatePostRepositoryStub } = makeSut();
    jest
      .spyOn(updatePostRepositoryStub, "update")
      .mockRejectedValueOnce(new Error());
    const promise = sut.update({ id: "any_id" });
    await expect(promise).rejects.toThrow();
  });

  test("should return the updated post on success", async () => {
    const { sut } = makeSut();
    const post = await sut.update({ id: "any_id" });
    expect(post).toEqual(makeFakeUpdatedPost());
  });
});
