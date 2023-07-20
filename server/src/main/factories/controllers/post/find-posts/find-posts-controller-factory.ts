import { FindPostsController } from "../../../../../presentations/controllers/post/find-posts/find-posts-controller";
import { Controller } from "../../../../../presentations/protocols";
import { makeFindPostsUseCase } from "../../../use-cases/post/find-posts/find-posts-factory";

export const makeFindPostsController = (): Controller => {
  const findPostsUseCase = makeFindPostsUseCase();
  return new FindPostsController(findPostsUseCase);
};
