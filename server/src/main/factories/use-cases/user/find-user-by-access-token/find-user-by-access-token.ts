import { FindUserByAccessTokenUseCase } from "../../../../../data/use-cases/user/find-user-by-access-token/find-user-by-access-token";
import { FindUserByAccessToken } from "../../../../../domain/use-cases/user/find-user-by-access-token";
import { PrismaUserRepository } from "../../../../../infra/db/prisma/user/prisma-user-repository";

export const makeFindUserByAccessTokenUseCase = (): FindUserByAccessToken => {
  const findUserByAccesTokenRepository = new PrismaUserRepository();
  return new FindUserByAccessTokenUseCase(findUserByAccesTokenRepository);
};
