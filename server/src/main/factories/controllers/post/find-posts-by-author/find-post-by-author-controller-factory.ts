import { FindPostsByAuthorController } from "../../../../../presentations/controllers/post/find-posts-by-author/find-posts-by-author";
import { Controller } from "../../../../../presentations/protocols";
import { makeFindPostsByAuthorUseCase } from "../../../use-cases/post/find-posts-by-author/find-post-by-author-factory";
import { makeFindPostsByAuthorValidation } from "./find-post-by-author-controller-validation-factory";

export const makeFindPostsByAuthorController = (): Controller => {
  const findPostByIdUseCase = makeFindPostsByAuthorUseCase();
  const validation = makeFindPostsByAuthorValidation();
  return new FindPostsByAuthorController(validation, findPostByIdUseCase);
};
