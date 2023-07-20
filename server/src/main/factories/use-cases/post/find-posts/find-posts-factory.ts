import { FindPostsUseCase } from "../../../../../data/use-cases/post/find-posts/find-posts";
import { FindPosts } from "../../../../../domain/use-cases/post/find-posts";
import { PrismaPostRepository } from "../../../../../infra/db/prisma/post/prisma-post-repository";

export const makeFindPostsUseCase = (): FindPosts => {
  const postRepository = new PrismaPostRepository();
  return new FindPostsUseCase(postRepository);
};
