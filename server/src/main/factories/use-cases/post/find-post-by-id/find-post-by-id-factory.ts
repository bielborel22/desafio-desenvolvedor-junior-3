import { FindPostByIdUseCase } from "../../../../../data/use-cases/post/find-post-by-id/find-post-by-id";
import { FindPostById } from "../../../../../domain/use-cases/post/find-post-by-id";
import { PrismaPostRepository } from "../../../../../infra/db/prisma/post/prisma-post-repository";

export const makeFindPostByIdUseCase = (): FindPostById => {
  const postRepository = new PrismaPostRepository();
  return new FindPostByIdUseCase(postRepository);
};
