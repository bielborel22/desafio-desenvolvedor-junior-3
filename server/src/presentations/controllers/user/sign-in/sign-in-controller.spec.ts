import {
  Authentication,
  MissingParameterError,
  UserAuthParams,
  UserModel,
  Validation,
  ok,
  serverError,
  unauthorized,
} from "../sign-in/sign-in-controller-protocols";
import { SignInController } from "./sign-in-controller";

const makeFakeRequest = () => ({
  body: {
    email: "any_email@mail.com",
    password: "any_password",
  },
});

const makeFakeUser = (): UserModel => ({
  id: "any_id",
  email: "any_email@mail.com",
  password: "any_password",
  accessToken: "any_token",
});

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(data: UserAuthParams): Promise<UserModel | null> {
      return Promise.resolve(makeFakeUser());
    }
  }
  return new AuthenticationStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error | null {
      return null;
    }
  }
  return new ValidationStub();
};

type SutType = {
  sut: SignInController;
  validationStub: Validation;
  authenticationStub: Authentication;
};

const makeSut = (): SutType => {
  const validation = makeValidation();
  const authentication = makeAuthentication();
  const sut = new SignInController(validation, authentication);
  return {
    sut,
    validationStub: validation,
    authenticationStub: authentication,
  };
};

describe("Sign In Controller", () => {
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
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParameterError("any_field"));
  });

  test("should return 500 if Validation throws", async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new Error());
  });

  test("should call Authentication with correct values", async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, "auth");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(authSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("should return 401 if Authentication returns null", async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(Promise.resolve(null));
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(unauthorized());
  });

  test("should return 500 if Authentication throws", async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, "auth").mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("should return 200 on success", async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok({ user: makeFakeUser() }));
  });
});
