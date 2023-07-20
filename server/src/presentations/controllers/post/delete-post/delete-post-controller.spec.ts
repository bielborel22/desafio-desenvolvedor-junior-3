import {
  FindPostById,
  PostModel,
  HttpRequest,
  MissingParameterError,
  InvalidParameterError,
  Validation,
  badRequest,
  serverError,
  DeletePost,
} from "./delete-post-controller-protocols";
import { DeletePostController } from "./delete-post-controller";

const makeFakeRequest = (): HttpRequest => ({
  params: {
    postId: "any_id",
  },
});

const makeFakePost = (): PostModel => ({
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

const makeDeletePostUseCase = (): DeletePost => {
  class DeletePostUseCaseStub implements DeletePost {
    delete(id: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new DeletePostUseCaseStub();
};

const makeFindPostByIdUseCase = (): FindPostById => {
  class FindPostByIdUseCaseStub implements FindPostById {
    findById(id: string): Promise<PostModel | null> {
      return Promise.resolve(makeFakePost());
    }
  }
  return new FindPostByIdUseCaseStub();
};

type SutType = {
  sut: DeletePostController;
  validationStub: Validation;
  deletePostUseCaseStub: DeletePost;
  findPostByIdUseCaseStub: FindPostById;
};

const makeSut = (): SutType => {
  const validationStub = makeValidation();
  const deletePostUseCase = makeDeletePostUseCase();
  const findPostByIdUseCase = makeFindPostByIdUseCase();
  const sut = new DeletePostController(
    validationStub,
    findPostByIdUseCase,
    deletePostUseCase
  );
  return {
    sut,
    validationStub,
    deletePostUseCaseStub: deletePostUseCase,
    findPostByIdUseCaseStub: findPostByIdUseCase,
  };
};

describe("Delete Post Controller", () => {
  test("should call Validation with correct values", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.params);
  });

  test("should return 400 if Validation fails", async () => {
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

  test("should call FindPostByIdUseCase with correct post id", async () => {
    const { sut, findPostByIdUseCaseStub } = makeSut();
    const findSpy = jest.spyOn(findPostByIdUseCaseStub, "findById");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(findSpy).toHaveBeenCalledWith(httpRequest.params.postId);
  });

  test("should return 400 if FindPostByIdUseCase returns null", async () => {
    const { sut, findPostByIdUseCaseStub } = makeSut();
    jest.spyOn(findPostByIdUseCaseStub, "findById").mockResolvedValueOnce(null);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      badRequest(new InvalidParameterError("postId"))
    );
  });

  test("should return 500 if FindPostByIdUseCase throws", async () => {
    const { sut, findPostByIdUseCaseStub } = makeSut();
    jest
      .spyOn(findPostByIdUseCaseStub, "findById")
      .mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should call DeletePostUseCase with correct post id", async () => {
    const { sut, deletePostUseCaseStub } = makeSut();
    const deleteSpy = jest.spyOn(deletePostUseCaseStub, "delete");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(deleteSpy).toHaveBeenCalledWith(httpRequest.params.postId);
  });

  test("should return 500 if DeletePostUseCase throws", async () => {
    const { sut, deletePostUseCaseStub } = makeSut();
    jest
      .spyOn(deletePostUseCaseStub, "delete")
      .mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should return 200 if DeletePostUseCase returns true", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(200);
  });

  test("should return 400 if DeletePostUseCase returns false", async () => {
    const { sut, deletePostUseCaseStub } = makeSut();
    jest.spyOn(deletePostUseCaseStub, "delete").mockResolvedValueOnce(false);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      badRequest(new InvalidParameterError("postId"))
    );
  });
});
