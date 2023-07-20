"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeletePostUseCase = void 0;
const delete_post_1 = require("../../../../../data/use-cases/post/delete-post/delete-post");
const prisma_post_repository_1 = require("../../../../../infra/db/prisma/post/prisma-post-repository");
const makeDeletePostUseCase = () => {
    const postRepository = new prisma_post_repository_1.PrismaPostRepository();
    return new delete_post_1.DeletePostUseCase(postRepository);
};
exports.makeDeletePostUseCase = makeDeletePostUseCase;
