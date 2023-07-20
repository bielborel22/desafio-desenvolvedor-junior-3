import { UpdatePostUseCase } from "../../../../../data/use-cases/post/update-post/update-post";
import { UpdatePost } from "../../../../../domain/use-cases/post/update-post";
import { PrismaPostRepository } from "../../../../../infra/db/prisma/post/prisma-post-repository";

export const makeUpdatePostUseCase = (): UpdatePost => {
  const postRepository = new PrismaPostRepository();
  return new UpdatePostUseCase(postRepository, postRepository);
};
