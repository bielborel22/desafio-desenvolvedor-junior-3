"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindUserByAccessTokenUseCase = void 0;
const find_user_by_access_token_1 = require("../../../../../data/use-cases/user/find-user-by-access-token/find-user-by-access-token");
const prisma_user_repository_1 = require("../../../../../infra/db/prisma/user/prisma-user-repository");
const makeFindUserByAccessTokenUseCase = () => {
    const findUserByAccesTokenRepository = new prisma_user_repository_1.PrismaUserRepository();
    return new find_user_by_access_token_1.FindUserByAccessTokenUseCase(findUserByAccesTokenRepository);
};
exports.makeFindUserByAccessTokenUseCase = makeFindUserByAccessTokenUseCase;
