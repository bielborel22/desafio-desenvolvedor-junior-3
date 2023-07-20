import { FindPostsByAuthorUseCase } from "./find-posts-by-author";
import {
  FindPostsByAuthorIdRepository,
  PostModel,
} from "./find-posts-by-author-protocols";

const makeFakePosts = (): PostModel[] => [
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

const makeFindPostsByAuthorRepository = (): FindPostsByAuthorIdRepository => {
  class FindPostsByAuthorRepositoryStub
    implements FindPostsByAuthorIdRepository
  {
    async findAllByAuthorId(authorId: string): Promise<PostModel[]> {
      const postsByAuthorId = makeFakePosts().filter(
        (p) => p.authorId === authorId
      );
      return Promise.resolve(postsByAuthorId);
    }
  }
  return new FindPostsByAuthorRepositoryStub();
};

type SutType = {
  sut: FindPostsByAuthorUseCase;
  findPostsByAuthorRepositoryStub: FindPostsByAuthorIdRepository;
};

const makeSut = (): SutType => {
  const findPostsByAuthorRepository = makeFindPostsByAuthorRepository();
  const sut = new FindPostsByAuthorUseCase(findPostsByAuthorRepository);
  return {
    sut,
    findPostsByAuthorRepositoryStub: findPostsByAuthorRepository,
  };
};

describe("Find Posts By Author UseCase", () => {
  test("should call FindPostsByAuthorRepository with correct author id", async () => {
    const { sut, findPostsByAuthorRepositoryStub } = makeSut();
    const findAllByAuthorIdSpy = jest.spyOn(
      findPostsByAuthorRepositoryStub,
      "findAllByAuthorId"
    );
    await sut.findAllByAuthorId("any_author_id");
    expect(findAllByAuthorIdSpy).toHaveBeenCalledWith("any_author_id");
  });

  test("should throw if FindPostsByAuthorRepository throws", async () => {
    const { sut, findPostsByAuthorRepositoryStub } = makeSut();
    jest
      .spyOn(findPostsByAuthorRepositoryStub, "findAllByAuthorId")
      .mockRejectedValueOnce(new Error());
    const promise = sut.findAllByAuthorId("any_author_id");
    await expect(promise).rejects.toThrow();
  });

  test("should return an array of posts, of an author, on success", async () => {
    const { sut } = makeSut();
    const posts = await sut.findAllByAuthorId("any_author_id");
    const allPostsSameAuthor = posts.every(
      (p) => p.authorId === "any_author_id"
    );
    expect(allPostsSameAuthor).toBe(true);
  });
});
