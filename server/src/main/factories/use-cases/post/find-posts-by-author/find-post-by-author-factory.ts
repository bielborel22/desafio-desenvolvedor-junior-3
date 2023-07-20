import { FindPostsByAuthorUseCase } from "../../../../../data/use-cases/post/find-post-by-author/find-posts-by-author";
import { FindPostsByAuthorId } from "../../../../../domain/use-cases/post/find-posts-by-author";
import { PrismaPostRepository } from "../../../../../infra/db/prisma/post/prisma-post-repository";

export const makeFindPostsByAuthorUseCase = (): FindPostsByAuthorId => {
  const postRepository = new PrismaPostRepository();
  return new FindPostsByAuthorUseCase(postRepository);
};
