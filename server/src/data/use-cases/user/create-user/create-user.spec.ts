import { CreateUserUseCase } from "./create-user";
import {
  CreateUserModel,
  CreateUserRepository,
  FindUserByEmailRepository,
  Hasher,
  UserModel,
} from "./create-user-protocols";

const makeCreateUserModel = (): CreateUserModel => ({
  email: "any_email",
  password: "any_password",
  accessToken: "any_token",
});

const makeFakeUser = (): UserModel => ({
  id: "any_id",
  email: "any_email",
  password: "any_password",
  accessToken: "any_token",
});

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve("hashed_password");
    }
  }
  return new HasherStub();
};

const makeCreateUserRepository = (): CreateUserRepository => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create(user: CreateUserModel): Promise<UserModel> {
      return Promise.resolve(makeFakeUser());
    }
  }
  return new CreateUserRepositoryStub();
};

const makeFindUserByEmailRepository = (): FindUserByEmailRepository => {
  class FindUserByEmailRepositoryStub implements FindUserByEmailRepository {
    async findByEmail(email: string): Promise<UserModel | null> {
      return Promise.resolve(null);
    }
  }
  return new FindUserByEmailRepositoryStub();
};

type SutType = {
  sut: CreateUserUseCase;
  hasherStub: Hasher;
  createUserRepositoryStub: CreateUserRepository;
  findUserByEmailRepositoryStub: FindUserByEmailRepository;
};

const makeSut = (): SutType => {
  const createUserRepository = makeCreateUserRepository();
  const findUserByEmailRepository = makeFindUserByEmailRepository();
  const hasher = makeHasher();
  const sut = new CreateUserUseCase(
    hasher,
    createUserRepository,
    findUserByEmailRepository
  );
  return {
    sut,
    hasherStub: hasher,
    createUserRepositoryStub: createUserRepository,
    findUserByEmailRepositoryStub: findUserByEmailRepository,
  };
};

describe("Create User Use Case", () => {
  test("should call Hasher with correct password", async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, "hash");
    const user = makeCreateUserModel();
    await sut.create(user);
    expect(hashSpy).toHaveBeenCalledWith(user.password);
  });

  test("should throw if Hasher throws", async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, "hash").mockRejectedValueOnce(new Error());
    const promise = sut.create(makeCreateUserModel());
    await expect(promise).rejects.toThrow();
  });

  test("should call FindUserByEmailRepository with correct email", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    const findByEmailSpy = jest.spyOn(
      findUserByEmailRepositoryStub,
      "findByEmail"
    );
    const user = makeCreateUserModel();
    await sut.create(user);
    expect(findByEmailSpy).toHaveBeenCalledWith(user.email);
  });

  test("should throw if FindUserByEmailRepository throws", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByEmailRepositoryStub, "findByEmail")
      .mockRejectedValueOnce(new Error());
    const promise = sut.create(makeCreateUserModel());
    await expect(promise).rejects.toThrow();
  });

  test("should return null if FindUserByEmailRepository returns an user", async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(findUserByEmailRepositoryStub, "findByEmail")
      .mockResolvedValueOnce(makeFakeUser());
    const user = await sut.create(makeCreateUserModel());
    expect(user).toBeNull();
  });

  test("should call CreateUserRepository with correct values", async () => {
    const { sut, createUserRepositoryStub } = makeSut();
    const createUserRepositorySpy = jest.spyOn(
      createUserRepositoryStub,
      "create"
    );
    const user = makeCreateUserModel();
    await sut.create(user);
    user.password = "hashed_password";
    expect(createUserRepositorySpy).toHaveBeenCalledWith(user);
  });

  test("should throw if CreateUserRepository throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(sut, "create").mockRejectedValueOnce(new Error());
    const promise = sut.create(makeCreateUserModel());
    expect(promise).rejects.toThrow();
  });

  test("should return an user on success", async () => {
    const { sut } = makeSut();
    const user = await sut.create(makeCreateUserModel());
    expect(user).toEqual(makeFakeUser());
  });
});
