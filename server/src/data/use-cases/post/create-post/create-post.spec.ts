import { CreatePostUseCase } from "./create-post";
import {
  CreatePostParams,
  CreatePostRepository,
} from "./create-post-protocols";

const makeCreatePostRepository = (): CreatePostRepository => {
  class CreatePostRepositoryStub implements CreatePostRepository {
    async create(data: CreatePostParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new CreatePostRepositoryStub();
};

const makeFakeCreatePostParams = (): CreatePostParams => ({
  title: "any_title",
  content: "any_content",
  authorId: "any_author_id",
});

type SutType = {
  sut: CreatePostUseCase;
  createPostRepositoryStub: CreatePostRepository;
};

const makeSut = (): SutType => {
  const createPostRepository = makeCreatePostRepository();
  const sut = new CreatePostUseCase(createPostRepository);
  return {
    sut,
    createPostRepositoryStub: createPostRepository,
  };
};

describe("Create Post UseCase", () => {
  test("should call CreatePostRepository with correct values", async () => {
    const { sut, createPostRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createPostRepositoryStub, "create");
    const postData = {
      title: "any_title",
      content: "any_content",
      authorId: "any_author_id",
    };
    await sut.create(postData);
    expect(createSpy).toHaveBeenCalledWith(postData);
  });

  test("should throw if CreatePostRepository throws", async () => {
    const { sut, createPostRepositoryStub } = makeSut();
    jest
      .spyOn(createPostRepositoryStub, "create")
      .mockRejectedValueOnce(new Error());
    const promise = sut.create(makeFakeCreatePostParams());
    await expect(promise).rejects.toThrow();
  });

  test("should not return if CreatePostRepository succeeds", async () => {
    const { sut } = makeSut();
    const result = await sut.create(makeFakeCreatePostParams());
    expect(result).toBeUndefined();
  });
});
