"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthenticationUseCase = void 0;
const authentication_1 = require("../../../../../data/use-cases/user/authentication/authentication");
const bcrypt_adapter_1 = require("../../../../../infra/criptography/bcrypt/bcrypt-adapter");
const jwt_adapter_1 = require("../../../../../infra/criptography/jwt/jwt-adapter");
const prisma_user_repository_1 = require("../../../../../infra/db/prisma/user/prisma-user-repository");
const makeAuthenticationUseCase = () => {
    const SALT = 12;
    const userRepository = new prisma_user_repository_1.PrismaUserRepository();
    const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(SALT);
    const jwtAdapter = new jwt_adapter_1.JwtAdapter("secret");
    return new authentication_1.AuthenticationUseCase(userRepository, bcryptAdapter, jwtAdapter, userRepository);
};
exports.makeAuthenticationUseCase = makeAuthenticationUseCase;
