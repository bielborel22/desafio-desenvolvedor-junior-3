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
exports.PrismaPostRepository = void 0;
const prisma_helper_1 = require("../helper/prisma-helper");
class PrismaPostRepository {
    constructor() {
        this.prismaClient = prisma_helper_1.PrismaHelper.prismaClient;
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.prismaClient.post.findMany();
            return posts.map(prisma_helper_1.PrismaHelper.mapPostToDomain);
        });
    }
    findAllByAuthorId(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.prismaClient.post.findMany({
                where: {
                    authorId,
                },
            });
            return posts.map(prisma_helper_1.PrismaHelper.mapPostToDomain);
        });
    }
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, content } = params;
            const updatedPost = yield this.prismaClient.post.update({
                where: {
                    id,
                },
                data: {
                    title,
                    content,
                },
            });
            return prisma_helper_1.PrismaHelper.mapPostToDomain(updatedPost);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.post.delete({
                where: {
                    id,
                },
            });
            return true;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.prismaClient.post.findUnique({
                where: {
                    id,
                },
            });
            if (!post)
                return null;
            return prisma_helper_1.PrismaHelper.mapPostToDomain(post);
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, authorId } = data;
            yield this.prismaClient.post.create({
                data: {
                    title,
                    content,
                    authorId,
                },
            });
        });
    }
}
exports.PrismaPostRepository = PrismaPostRepository;
