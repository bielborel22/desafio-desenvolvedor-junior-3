import { CreatePostUseCase } from "../../../../../data/use-cases/post/create-post/create-post";
import { PrismaPostRepository } from "../../../../../infra/db/prisma/post/prisma-post-repository";
import { CreatePost } from "../../../../../domain/use-cases/post/create-post";

export const makeCreatePostUseCase = (): CreatePost => {
  const postRepository = new PrismaPostRepository();
  return new CreatePostUseCase(postRepository);
};
