import { UpdatePostController } from "./update-post-controller";
import {
  HttpRequest,
  MissingParameterError,
  PostModel,
  UpdatePost,
  UpdatePostParams,
  Validation,
  badRequest,
  ok,
  serverError,
} from "./update-post-protocols";

const makeFakeRequest = (): HttpRequest => ({
  params: {
    postId: "any_id",
  },
  body: {
    title: "any_title",
    content: "any_content",
  },
});

const makeFakeUpdatedPost = (): PostModel => ({
  id: "any_id",
  title: "any_title",
  content: "any_content",
  authorId: "any_author_id",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

const makeUpdatePostUseCase = (): UpdatePost => {
  class UpdatePostUseCaseStub implements UpdatePost {
    update(params: UpdatePostParams): Promise<PostModel | null> {
      return Promise.resolve(makeFakeUpdatedPost());
    }
  }
  return new UpdatePostUseCaseStub();
};

type SutType = {
  sut: UpdatePostController;
  validationStub: Validation;
  updatePostUseCaseStub: UpdatePost;
};

const makeSut = (): SutType => {
  const validationStub = makeValidation();
  const updatePostUseCase = makeUpdatePostUseCase();
  const sut = new UpdatePostController(validationStub, updatePostUseCase);
  return {
    sut,
    validationStub,
    updatePostUseCaseStub: updatePostUseCase,
  };
};

describe("Update Post Controller", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  test("should call Validation with correct values", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParameterError("any_field"));
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParameterError("any_field"))
    );
  });

  test("should return 500 if Validation throws", async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should call UpdatePostUseCase with correct values", async () => {
    const { sut, updatePostUseCaseStub } = makeSut();
    const updateSpy = jest.spyOn(updatePostUseCaseStub, "update");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(updateSpy).toHaveBeenCalledWith({
      id: httpRequest.params.postId,
      title: httpRequest.body.title,
      content: httpRequest.body.content,
    });
  });

  test("should return 500 if UpdatePostUseCase throws", async () => {
    const { sut, updatePostUseCaseStub } = makeSut();
    jest.spyOn(updatePostUseCaseStub, "update").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should return 200 if UpdatePostUseCase succeeds", async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok(makeFakeUpdatedPost()));
  });
});
