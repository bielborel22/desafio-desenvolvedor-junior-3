import { FindUserByAccessTokenUseCase } from "./find-user-by-access-token";
import {
  FindUserByAccessTokenRepository,
  UserModel,
} from "./find-user-by-access-token-protocols";

const makeFakeUser = (): UserModel => ({
  id: "valid_id",
  email: "valid_email",
  password: "hashed_password",
});

const makeFindUserByAccessTokenRepository =
  (): FindUserByAccessTokenRepository => {
    class FindUserByAccessTokenRepositoryStub
      implements FindUserByAccessTokenRepository
    {
      async findByAccessToken(accessToken: string): Promise<UserModel | null> {
        return Promise.resolve(makeFakeUser());
      }
    }
    return new FindUserByAccessTokenRepositoryStub();
  };

type SutType = {
  sut: FindUserByAccessTokenUseCase;
  findUserByAccessTokenRepositoryStub: FindUserByAccessTokenRepository;
};

const makeSut = (): SutType => {
  const findUserByAccessTokenRepository = makeFindUserByAccessTokenRepository();
  const sut = new FindUserByAccessTokenUseCase(findUserByAccessTokenRepository);
  return {
    sut,
    findUserByAccessTokenRepositoryStub: findUserByAccessTokenRepository,
  };
};

describe("Find User By Access Token Use Case", () => {
  test("should call FindUserByAccessTokenRepository with correct values", async () => {
    const { sut, findUserByAccessTokenRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(
      findUserByAccessTokenRepositoryStub,
      "findByAccessToken"
    );
    await sut.findByAccessToken("any_token");
    expect(findSpy).toHaveBeenCalledWith("any_token");
  });

  test("should return null if FindUserByAccessTokenRepository returns null", async () => {
    const { sut, findUserByAccessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByAccessTokenRepositoryStub, "findByAccessToken")
      .mockResolvedValueOnce(null);
    const user = await sut.findByAccessToken("any_token");
    expect(user).toBeNull();
  });

  test("should return an user on success", async () => {
    const { sut } = makeSut();
    const user = await sut.findByAccessToken("any_token");
    expect(user).toEqual(makeFakeUser());
  });

  test("should throw if FindUserByAccessTokenRepository throws", async () => {
    const { sut, findUserByAccessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByAccessTokenRepositoryStub, "findByAccessToken")
      .mockRejectedValueOnce(new Error());
    const promise = sut.findByAccessToken("any_token");
    await expect(promise).rejects.toThrow();
  });
});
