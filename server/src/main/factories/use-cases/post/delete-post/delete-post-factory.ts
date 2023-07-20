import { DeletePostUseCase } from "../../../../../data/use-cases/post/delete-post/delete-post";
import { DeletePost } from "../../../../../domain/use-cases/post/delete-post";
import { PrismaPostRepository } from "../../../../../infra/db/prisma/post/prisma-post-repository";

export const makeDeletePostUseCase = (): DeletePost => {
  const postRepository = new PrismaPostRepository();
  return new DeletePostUseCase(postRepository);
};
