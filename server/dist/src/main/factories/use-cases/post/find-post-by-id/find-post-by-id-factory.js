"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindPostByIdUseCase = void 0;
const find_post_by_id_1 = require("../../../../../data/use-cases/post/find-post-by-id/find-post-by-id");
const prisma_post_repository_1 = require("../../../../../infra/db/prisma/post/prisma-post-repository");
const makeFindPostByIdUseCase = () => {
    const postRepository = new prisma_post_repository_1.PrismaPostRepository();
    return new find_post_by_id_1.FindPostByIdUseCase(postRepository);
};
exports.makeFindPostByIdUseCase = makeFindPostByIdUseCase;
