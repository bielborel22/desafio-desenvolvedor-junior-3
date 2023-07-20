"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindPostsUseCase = void 0;
const find_posts_1 = require("../../../../../data/use-cases/post/find-posts/find-posts");
const prisma_post_repository_1 = require("../../../../../infra/db/prisma/post/prisma-post-repository");
const makeFindPostsUseCase = () => {
    const postRepository = new prisma_post_repository_1.PrismaPostRepository();
    return new find_posts_1.FindPostsUseCase(postRepository);
};
exports.makeFindPostsUseCase = makeFindPostsUseCase;
