"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindPostsByAuthorUseCase = void 0;
const find_posts_by_author_1 = require("../../../../../data/use-cases/post/find-post-by-author/find-posts-by-author");
const prisma_post_repository_1 = require("../../../../../infra/db/prisma/post/prisma-post-repository");
const makeFindPostsByAuthorUseCase = () => {
    const postRepository = new prisma_post_repository_1.PrismaPostRepository();
    return new find_posts_by_author_1.FindPostsByAuthorUseCase(postRepository);
};
exports.makeFindPostsByAuthorUseCase = makeFindPostsByAuthorUseCase;
