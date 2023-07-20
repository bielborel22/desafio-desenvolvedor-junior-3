import { SignUpController } from "./sign-up-controller";
import {
  Authentication,
  CreateUser,
  CreateUserModel,
  HttpRequest,
  ParameterAlreadyInUseError,
  UserAuthParams,
  UserModel,
  Validation,
  badRequest,
  created,
  forbidden,
  serverError,
  MissingParameterError,
} from "./sign-up-controller-protocols";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: "any_email@mail.com",
    password: "any_password",
  },
});

const makeFakeUser = (): UserModel => ({
  id: "any_id",
  email: "any_email@mail.com",
  password: "hashed_password",
  accessToken: "access_token",
});

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

const makeCreateUserUseCase = (): CreateUser => {
  class CreateUserUseCaseStub implements CreateUser {
    async create(data: CreateUserModel): Promise<UserModel | null> {
      return Promise.resolve(makeFakeUser());
    }
  }
  return new CreateUserUseCaseStub();
};

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(data: UserAuthParams): Promise<UserModel | null> {
      return Promise.resolve(makeFakeUser());
    }
  }
  return new AuthenticationStub();
};

type SutType = {
  sut: SignUpController;
  validationStub: Validation;
  createUserStub: CreateUser;
  authenticationStub: Authentication;
};

const makeSut = (): SutType => {
  const validation = makeValidation();
  const createUser = makeCreateUserUseCase();
  const authentication = makeAuthentication();
  const sut = new SignUpController(validation, createUser, authentication);
  return {
    sut,
    validationStub: validation,
    createUserStub: createUser,
    authenticationStub: authentication,
  };
};

describe("Sign Up Controller", () => {
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

  test("should returns 500 if Validation throws", async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should call CreateUser with correct values", async () => {
    const { sut, createUserStub } = makeSut();
    const createSpy = jest.spyOn(createUserStub, "create");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(createSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("should returns 500 if CreateUser throws", async () => {
    const { sut, createUserStub } = makeSut();
    jest.spyOn(createUserStub, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should return 403 if CreateUser returns null", async () => {
    const { sut, createUserStub } = makeSut();
    jest
      .spyOn(createUserStub, "create")
      .mockReturnValueOnce(Promise.resolve(null));
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      forbidden(new ParameterAlreadyInUseError("email"))
    );
  });

  test("should call Authentication with correct user values", async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, "auth");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(authSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("should returns 500 if Authentication throws", async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, "auth").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should return 201 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(created({ user: makeFakeUser() }));
  });
});
