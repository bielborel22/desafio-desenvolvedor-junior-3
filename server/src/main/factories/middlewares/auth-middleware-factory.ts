import { AuthMiddleware } from "../../../presentations/middlewares/auth-middleware";
import { makeFindUserByAccessTokenUseCase } from "../use-cases/user/find-user-by-access-token/find-user-by-access-token";

export const makeAuthMiddleware = (): AuthMiddleware => {
  const findUserByAccessToken = makeFindUserByAccessTokenUseCase();
  return new AuthMiddleware(findUserByAccessToken);
};
