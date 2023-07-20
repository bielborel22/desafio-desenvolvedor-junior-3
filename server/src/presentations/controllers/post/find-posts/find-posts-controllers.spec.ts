import { FindPosts } from "../../../../domain/use-cases/post/find-posts";
import { FindPostsController } from "./find-posts-controller";
import {
  FindPostsRepository,
  HttpRequest,
  PostModel,
  ok,
} from "./find-posts-protocols";

const makeFakeRequest = (): HttpRequest => ({});

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

const makeFindPostsUseCase = (): FindPosts => {
  class FindPostsUseCaseStub implements FindPosts {
    find(): Promise<PostModel[]> {
      return Promise.resolve(makeFakePosts());
    }
  }
  return new FindPostsUseCaseStub();
};

type SutType = {
  sut: FindPostsController;
  findPostsUseCaseStub: FindPostsRepository;
};

const makeSut = (): SutType => {
  const findPostsUseCase = makeFindPostsUseCase();
  const sut = new FindPostsController(findPostsUseCase);
  return { sut, findPostsUseCaseStub: findPostsUseCase };
};

describe("Find Posts Controller", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  test("Should call FindPostsUseCase", async () => {
    const { sut, findPostsUseCaseStub } = makeSut();
    const findSpy = jest.spyOn(findPostsUseCaseStub, "find");
    await sut.handle(makeFakeRequest());
    expect(findSpy).toHaveBeenCalled();
  });

  test("Should return 200 on success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakePosts()));
  });

  test("Should return 500 if FindPostsUseCase throws", async () => {
    const { sut, findPostsUseCaseStub } = makeSut();
    jest
      .spyOn(findPostsUseCaseStub, "find")
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new Error());
  });
});
