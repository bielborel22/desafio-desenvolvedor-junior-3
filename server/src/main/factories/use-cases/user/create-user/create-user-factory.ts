import { CreateUserUseCase } from "../../../../../data/use-cases/user/create-user/create-user";
import { BcryptAdapter } from "../../../../../infra/criptography/bcrypt/bcrypt-adapter";
import { PrismaUserRepository } from "../../../../../infra/db/prisma/user/prisma-user-repository";

export const makeCreateUserUseCase = (): CreateUserUseCase => {
  const SALT = 12;
  const bcryptAdapter = new BcryptAdapter(SALT);
  const userRepository = new PrismaUserRepository();
  return new CreateUserUseCase(bcryptAdapter, userRepository, userRepository);
};
