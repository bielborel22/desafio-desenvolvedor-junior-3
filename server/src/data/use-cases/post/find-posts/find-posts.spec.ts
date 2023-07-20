import { FindPosts } from "../../../../domain/use-cases/post/find-posts";
import { FindPostsRepository } from "../../../protocols/db/post/find-posts-repository";
import { PostModel } from "../find-post-by-id/find-post-by-id-protocols";
import { FindPostsUseCase } from "./find-posts";

const makeFakePosts = (): PostModel[] => [
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

const makeFindPostsRepository = (): FindPostsRepository => {
  class FindPostsRepositoryStub implements FindPostsRepository {
    find(): Promise<PostModel[]> {
      return Promise.resolve(makeFakePosts());
    }
  }
  return new FindPostsRepositoryStub();
};

type SutType = {
  sut: FindPosts;
  findPostsRepositoryStub: FindPostsRepository;
};

const makeSut = (): SutType => {
  const findPostsRepositoryStub = makeFindPostsRepository();
  const sut = new FindPostsUseCase(findPostsRepositoryStub);
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

  test("should call FindPostsRepository", async () => {
    const { sut, findPostsRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(findPostsRepositoryStub, "find");
    await sut.find();
    expect(findSpy).toHaveBeenCalled();
  });

  test("should return a list of posts on success", async () => {
    const { sut } = makeSut();
    const posts = await sut.find();
    expect(posts).toEqual(makeFakePosts());
  });

  test("should throw if FindPostsRepository throws", async () => {
    const { sut, findPostsRepositoryStub } = makeSut();
    jest
      .spyOn(findPostsRepositoryStub, "find")
      .mockRejectedValueOnce(new Error());
    const promise = sut.find();
    await expect(promise).rejects.toThrow();
  });
});
