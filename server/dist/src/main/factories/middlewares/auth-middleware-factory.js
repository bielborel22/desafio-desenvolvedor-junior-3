"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthMiddleware = void 0;
const auth_middleware_1 = require("../../../presentations/middlewares/auth-middleware");
const find_user_by_access_token_1 = require("../use-cases/user/find-user-by-access-token/find-user-by-access-token");
const makeAuthMiddleware = () => {
    const findUserByAccessToken = (0, find_user_by_access_token_1.makeFindUserByAccessTokenUseCase)();
    return new auth_middleware_1.AuthMiddleware(findUserByAccessToken);
};
exports.makeAuthMiddleware = makeAuthMiddleware;
