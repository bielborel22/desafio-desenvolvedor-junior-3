import { FindPostByIdController } from "./find-post-by-id-controller";
import {
  FindPostById,
  HttpRequest,
  PostModel,
  ok,
  serverError,
  MissingParameterError,
  Validation,
  badRequest,
} from "./find-post-by-id-controller-protocols";

const makeFakeRequest = (): HttpRequest => ({
  params: {
    postId: "any_id",
  },
});

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

const makeFakePost = (): PostModel => ({
  id: "any_id",
  title: "any_title",
  content: "any_content",
  authorId: "any_author_id",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const makeFindPostByIdUseCase = (): FindPostById => {
  class FindPostByIdUseCaseStub implements FindPostById {
    async findById(id: string): Promise<PostModel | null> {
      return Promise.resolve(makeFakePost());
    }
  }
  return new FindPostByIdUseCaseStub();
};

type SutType = {
  sut: FindPostByIdController;
  findPostByIdUseCaseStub: FindPostById;
  validationStub: Validation;
};

const makeSut = (): SutType => {
  const findPostByIdUseCase = makeFindPostByIdUseCase();
  const validation = makeValidation();
  const sut = new FindPostByIdController(validation, findPostByIdUseCase);
  return {
    sut,
    findPostByIdUseCaseStub: findPostByIdUseCase,
    validationStub: validation,
  };
};

describe("Find Post By Id Controller", () => {
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

  test("should call FindPostByIdUseCase with correct id", async () => {
    const { sut, findPostByIdUseCaseStub } = makeSut();
    const findByIdSpy = jest.spyOn(findPostByIdUseCaseStub, "findById");
    await sut.handle(makeFakeRequest());
    expect(findByIdSpy).toHaveBeenCalledWith("any_id");
  });

  test("should return 500 if FindPostByIdUseCase throws", async () => {
    const { sut, findPostByIdUseCaseStub } = makeSut();
    jest
      .spyOn(findPostByIdUseCaseStub, "findById")
      .mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should return 200 if FindPostByIdUseCase succeeds", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakePost()));
  });
});
