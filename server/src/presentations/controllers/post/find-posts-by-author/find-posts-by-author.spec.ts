import { Validation } from "../create-post/create-post-controller-protocols";
import { FindPostsByAuthorController } from "./find-posts-by-author";
import {
  FindPostsByAuthorId,
  HttpRequest,
  serverError,
  ok,
  PostModel,
  badRequest,
  MissingParameterError,
} from "./find-posts-by-author-protocols";

const makeFakeRequest = (): HttpRequest => ({
  params: {
    authorId: "any_author_id",
  },
});

const makeFakePosts = (): PostModel[] => [
  {
    id: "any_id",
    title: "any_title",
    content: "any_content",
    authorId: "any_author_id",
    createdAt: new Date(),
    updatedAt: new Date(),
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

const makeFindPostsByAuthorUseCase = (): FindPostsByAuthorId => {
  class FindPostsByAuthorUseCaseStub implements FindPostsByAuthorId {
    findAllByAuthorId(authorId: string): Promise<PostModel[]> {
      const postsByAuthor = makeFakePosts().filter(
        (post) => post.authorId === authorId
      );
      return Promise.resolve(postsByAuthor);
    }
  }
  return new FindPostsByAuthorUseCaseStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

type SutType = {
  sut: FindPostsByAuthorController;
  findPostsByAuthorUseCaseStub: FindPostsByAuthorId;
  validationStub: Validation;
};

const makeSut = (): SutType => {
  const findPostsByAuthorUseCaseStub = makeFindPostsByAuthorUseCase();
  const validationStub = makeValidation();
  const sut = new FindPostsByAuthorController(
    validationStub,
    findPostsByAuthorUseCaseStub
  );
  return {
    sut,
    findPostsByAuthorUseCaseStub,
    validationStub,
  };
};

describe("Find Posts By Author Controller", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  test("should call Validation with correct values", () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeRequest();
    sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params);
  });

  test("should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParameterError("any_field"));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      badRequest(new MissingParameterError("any_field"))
    );
  });

  test("should return 500 if Validation throws", async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should call FindPostsByAuthorUseCase with correct author id", async () => {
    const { sut, findPostsByAuthorUseCaseStub } = makeSut();
    const findAllByAuthorIdSpy = jest.spyOn(
      findPostsByAuthorUseCaseStub,
      "findAllByAuthorId"
    );
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(findAllByAuthorIdSpy).toHaveBeenCalledWith("any_author_id");
  });

  test("should return 500 if FindPostsByAuthorUseCase throws", async () => {
    const { sut, findPostsByAuthorUseCaseStub } = makeSut();
    jest
      .spyOn(findPostsByAuthorUseCaseStub, "findAllByAuthorId")
      .mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should return 200 if FindPostsByAuthorUseCase succeeds", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    const postsByAuthor = makeFakePosts().filter(
      (post) => post.authorId === "any_author_id"
    );
    expect(httpResponse).toEqual(ok(postsByAuthor));
  });
});
