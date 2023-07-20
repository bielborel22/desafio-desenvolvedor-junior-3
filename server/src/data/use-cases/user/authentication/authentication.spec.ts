import { AuthenticationUseCase } from "./authentication";
import {
  Encrypter,
  FindUserByEmailRepository,
  HashComparer,
  UpdateAccessTokenRepository,
  UserAuthParams,
  UserModel,
} from "./authentication-protocols";

const makeFakeAuthData = (): UserAuthParams => ({
  email: "any_email",
  password: "any_password",
});

const makeFakeUser = (): UserModel => ({
  id: "any_id",
  email: "any_email",
  password: "hashed_password",
  accessToken: "any_token",
});

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashComparerStub();
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt(value: string): Promise<string> {
      return Promise.resolve("any_token");
    }
  }
  return new EncrypterStub();
};

const makeFindUserByEmailRepository = (): FindUserByEmailRepository => {
  class FindUserByEmailRepositoryStub implements FindUserByEmailRepository {
    async findByEmail(email: string): Promise<UserModel | null> {
      return Promise.resolve(makeFakeUser());
    }
  }
  return new FindUserByEmailRepositoryStub();
};

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new UpdateAccessTokenRepositoryStub();
};

type SutType = {
  sut: AuthenticationUseCase;
  findUserByEmailRepositoryStub: FindUserByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository;
};

const makeSut = (): SutType => {
  const findUserByEmailRepository = makeFindUserByEmailRepository();
  const updateAccessTokenRepository = makeUpdateAccessTokenRepository();
  const hashComparer = makeHashComparer();
  const encrypter = makeEncrypter();
  const sut = new AuthenticationUseCase(
    findUserByEmailRepository,
    hashComparer,
    encrypter,
    updateAccessTokenRepository
  );
  return {
    sut,
    findUserByEmailRepositoryStub: findUserByEmailRepository,
    hashComparerStub: hashComparer,
    encrypterStub: encrypter,
    updateAccessTokenRepositoryStub: updateAccessTokenRepository,
  };
};

describe("User Authencation UseCase", () => {
  test("should call FindUserByEmailRepository with correct email", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    const findByEmailSpy = jest.spyOn(
      findUserByEmailRepositoryStub,
      "findByEmail"
    );
    const data = makeFakeAuthData();
    await sut.auth(data);
    expect(findByEmailSpy).toHaveBeenCalledWith(data.email);
  });

  test("should throw if FindUserByEmailRepository throws", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByEmailRepositoryStub, "findByEmail")
      .mockRejectedValueOnce(new Error());
    const data = makeFakeAuthData();
    const promise = sut.auth(data);
    await expect(promise).rejects.toThrow();
  });

  test("should return null if FindUserByEmailRepository returns null", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByEmailRepositoryStub, "findByEmail")
      .mockResolvedValueOnce(null);
    const data = makeFakeAuthData();
    const accessToken = await sut.auth(data);
    expect(accessToken).toBeNull();
  });

  test("should call HashComparer with correct values", async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, "compare");
    const authData = makeFakeAuthData();
    await sut.auth(authData);
    expect(compareSpy).toHaveBeenCalledWith(
      authData.password,
      "hashed_password"
    );
  });

  test("should throw if HashComparer throws", async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, "compare").mockRejectedValueOnce(new Error());
    const authData = makeFakeAuthData();
    const promise = sut.auth(authData);
    await expect(promise).rejects.toThrow();
  });

  test("should return null if HashComparer returns false", async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, "compare").mockResolvedValueOnce(false);
    const authData = makeFakeAuthData();
    const accessToken = await sut.auth(authData);
    expect(accessToken).toBeNull();
  });

  test("should call Encrypter with correct user id", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const authData = makeFakeAuthData();
    await sut.auth(authData);
    expect(encryptSpy).toHaveBeenCalledWith("any_id");
  });

  test("should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, "encrypt").mockRejectedValueOnce(new Error());
    const authData = makeFakeAuthData();
    const promise = sut.auth(authData);
    await expect(promise).rejects.toThrow();
  });

  test("should calls UpdateAccessTokenRepository with correct values", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      "updateAccessToken"
    );
    const authData = makeFakeAuthData();
    await sut.auth(authData);
    expect(updateSpy).toHaveBeenCalledWith("any_id", "any_token");
  });

  test("should throw if UpdateAccessTokenRepository throws", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(updateAccessTokenRepositoryStub, "updateAccessToken")
      .mockRejectedValueOnce(new Error());
    const authData = makeFakeAuthData();
    const promise = sut.auth(authData);
    await expect(promise).rejects.toThrow();
  });

  test("should return an user on success", async () => {
    const { sut } = makeSut();
    const authData = makeFakeAuthData();
    const user = await sut.auth(authData);
    expect(user).toEqual(makeFakeUser());
  });
});
