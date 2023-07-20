"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdatePostUseCase = void 0;
const update_post_1 = require("../../../../../data/use-cases/post/update-post/update-post");
const prisma_post_repository_1 = require("../../../../../infra/db/prisma/post/prisma-post-repository");
const makeUpdatePostUseCase = () => {
    const postRepository = new prisma_post_repository_1.PrismaPostRepository();
    return new update_post_1.UpdatePostUseCase(postRepository, postRepository);
};
exports.makeUpdatePostUseCase = makeUpdatePostUseCase;
