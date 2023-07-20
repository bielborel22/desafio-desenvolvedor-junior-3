import { AuthenticationUseCase } from "../../../../../data/use-cases/user/authentication/authentication";
import { BcryptAdapter } from "../../../../../infra/criptography/bcrypt/bcrypt-adapter";
import { JwtAdapter } from "../../../../../infra/criptography/jwt/jwt-adapter";
import { PrismaUserRepository } from "../../../../../infra/db/prisma/user/prisma-user-repository";

export const makeAuthenticationUseCase = (): AuthenticationUseCase => {
  const SALT = 12;
  const userRepository = new PrismaUserRepository();
  const bcryptAdapter = new BcryptAdapter(SALT);
  const jwtAdapter = new JwtAdapter("secret");
  return new AuthenticationUseCase(
    userRepository,
    bcryptAdapter,
    jwtAdapter,
    userRepository
  );
};
