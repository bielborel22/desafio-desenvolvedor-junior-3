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
exports.PrismaHelper = void 0;
const client_1 = require("@prisma/client");
exports.PrismaHelper = {
    prismaClient: new client_1.PrismaClient({
        log: ["query", "info", "warn"],
    }),
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.$connect();
        });
    },
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.$disconnect();
        });
    },
    mapUserToDomain(model) {
        return {
            id: model.id,
            email: model.email,
            password: model.hashedPassword,
            accessToken: model.accessToken,
        };
    },
    mapPostToDomain(model) {
        return {
            id: model.id,
            title: model.title,
            content: model.content,
            authorId: model.authorId,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        };
    },
};
