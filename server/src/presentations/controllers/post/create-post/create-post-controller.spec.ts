import { CreatePostController } from "./create-post-controller";
import {
  CreatePost,
  CreatePostParams,
  HttpRequest,
  MissingParameterError,
  Validation,
  badRequest,
  created,
  serverError,
} from "./create-post-controller-protocols";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    title: "any_title",
    content: "any_content",
  },
  userId: "any_user_id",
});

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

const makeCreatePostUseCase = (): CreatePost => {
  class CreatePostUseCaseStub implements CreatePost {
    create(data: CreatePostParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new CreatePostUseCaseStub();
};

type SutType = {
  sut: CreatePostController;
  validationStub: Validation;
  createPostStub: CreatePost;
};

const makeSut = (): SutType => {
  const validation = makeValidation();
  const createPost = makeCreatePostUseCase();
  const sut = new CreatePostController(validation, createPost);
  return {
    sut,
    validationStub: validation,
    createPostStub: createPost,
  };
};

describe("Create Post Controller", () => {
  test("should call Validation with correct values", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
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

  test("should return 400 if Validation fails", async () => {
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

  test("should call CreatePostUseCase with correct values", async () => {
    const { sut, createPostStub } = makeSut();
    const createSpy = jest.spyOn(createPostStub, "create");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(createSpy).toHaveBeenCalledWith({
      title: "any_title",
      content: "any_content",
      authorId: "any_user_id",
    });
  });

  test("should return 500 if CreatePostUseCase throws", async () => {
    const { sut, createPostStub } = makeSut();
    jest.spyOn(createPostStub, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should return 201 on success", async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(created({}));
  });
});
