"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreatePostUseCase = void 0;
const create_post_1 = require("../../../../../data/use-cases/post/create-post/create-post");
const prisma_post_repository_1 = require("../../../../../infra/db/prisma/post/prisma-post-repository");
const makeCreatePostUseCase = () => {
    const postRepository = new prisma_post_repository_1.PrismaPostRepository();
    return new create_post_1.CreatePostUseCase(postRepository);
};
exports.makeCreatePostUseCase = makeCreatePostUseCase;
