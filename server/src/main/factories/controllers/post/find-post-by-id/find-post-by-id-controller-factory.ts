import { FindPostByIdController } from "../../../../../presentations/controllers/post/find-post-by-id/find-post-by-id-controller";
import { Controller } from "../../../../../presentations/protocols";
import { makeFindPostByIdUseCase } from "../../../use-cases/post/find-post-by-id/find-post-by-id-factory";
import { makeFindPostByIdValidation } from "./find-post-by-id-controller-validation-factory";

export const makeFindPostByIdController = (): Controller => {
  const findPostByIdUseCase = makeFindPostByIdUseCase();
  const validation = makeFindPostByIdValidation();
  return new FindPostByIdController(validation, findPostByIdUseCase);
};
