import { UserModel } from "../../domain/models/user";
import { FindUserByAccessToken } from "../../domain/use-cases/user/find-user-by-access-token";
import { HttpRequest } from "../protocols";
import { AuthMiddleware } from "./auth-middleware";
import { forbidden, serverError, ok } from "../helpers/http/http-helper";
import { AccessDeniedError } from "../errors";

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    ["authorization"]: "any_token",
  },
});

const makeFakeUser = (): UserModel => ({
  id: "any_id",
  email: "any_email@mail.com",
  password: "any_password",
  accessToken: "any_token",
});

const makeFindUserByAccessToken = (): FindUserByAccessToken => {
  class FindUserByAccessTokenStub implements FindUserByAccessToken {
    async findByAccessToken(accessToken: string): Promise<UserModel | null> {
      return Promise.resolve(makeFakeUser());
    }
  }
  return new FindUserByAccessTokenStub();
};

type SutType = {
  sut: AuthMiddleware;
  findUserByAccessTokenStub: FindUserByAccessToken;
};

const makeSut = (): SutType => {
  const findUserByAccessToken = makeFindUserByAccessToken();
  const sut = new AuthMiddleware(findUserByAccessToken);
  return { sut, findUserByAccessTokenStub: findUserByAccessToken };
};

describe("Auth Middleware", () => {
  test("should return 403 no authorization exists in header", async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    delete httpRequest.headers?.["authorization"];
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test("should call FindAccountByAccessToken with correct accessToken", async () => {
    const { sut, findUserByAccessTokenStub } = makeSut();
    const httpRequest = makeFakeRequest();
    const findAccountByAccessTokenSpy = jest.spyOn(
      findUserByAccessTokenStub,
      "findByAccessToken"
    );
    await sut.handle(httpRequest);
    expect(findAccountByAccessTokenSpy).toHaveBeenCalledWith("any_token");
  });

  test("should return 403 if FindAccountByAccessToken returns null", async () => {
    const { sut, findUserByAccessTokenStub } = makeSut();
    jest
      .spyOn(findUserByAccessTokenStub, "findByAccessToken")
      .mockResolvedValueOnce(null);
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test("should return 200 if FindAccountByAccessToken returns an account", async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      ok({
        userId: "any_id",
      })
    );
  });

  test("should return 500 if FindAccountByAccessToken throws", async () => {
    const { sut, findUserByAccessTokenStub } = makeSut();
    jest
      .spyOn(findUserByAccessTokenStub, "findByAccessToken")
      .mockRejectedValueOnce(new Error());
    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
