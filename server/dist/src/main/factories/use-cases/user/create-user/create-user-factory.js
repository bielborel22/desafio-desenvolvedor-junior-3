"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateUserUseCase = void 0;
const create_user_1 = require("../../../../../data/use-cases/user/create-user/create-user");
const bcrypt_adapter_1 = require("../../../../../infra/criptography/bcrypt/bcrypt-adapter");
const prisma_user_repository_1 = require("../../../../../infra/db/prisma/user/prisma-user-repository");
const makeCreateUserUseCase = () => {
    const SALT = 12;
    const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(SALT);
    const userRepository = new prisma_user_repository_1.PrismaUserRepository();
    return new create_user_1.CreateUserUseCase(bcryptAdapter, userRepository, userRepository);
};
exports.makeCreateUserUseCase = makeCreateUserUseCase;
