"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const prisma_helper_1 = require("../helper/prisma-helper");
class PrismaUserRepository {
    constructor() {
        this.prismaClient = prisma_helper_1.PrismaHelper.prismaClient;
    }
    updateAccessToken(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.user.update({
                where: {
                    id,
                },
                data: {
                    accessToken: token,
                },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prismaClient.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user)
                return null;
            return prisma_helper_1.PrismaHelper.mapUserToDomain(user);
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = user;
            const createdUser = yield this.prismaClient.user.create({
                data: {
                    email,
                    hashedPassword: password,
                },
            });
            return prisma_helper_1.PrismaHelper.mapUserToDomain(createdUser);
        });
    }
    findByAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prismaClient.user.findFirst({
                where: {
                    accessToken,
                },
            });
            if (!user)
                return null;
            return prisma_helper_1.PrismaHelper.mapUserToDomain(user);
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
