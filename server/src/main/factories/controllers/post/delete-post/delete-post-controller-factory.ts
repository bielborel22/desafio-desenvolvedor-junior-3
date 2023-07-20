import { DeletePostController } from "../../../../../presentations/controllers/post/delete-post/delete-post-controller";
import { Controller } from "../../../../../presentations/protocols";
import { makeDeletePostUseCase } from "../../../use-cases/post/delete-post/delete-post-factory";
import { makeFindPostByIdUseCase } from "../../../use-cases/post/find-post-by-id/find-post-by-id-factory";
import { makeDeletePostValidation } from "./delete-post-controller-validation-factory";

export const makeDeletePostController = (): Controller => {
  const validation = makeDeletePostValidation();
  const findPostByIdUseCase = makeFindPostByIdUseCase();
  const deletePostUseCase = makeDeletePostUseCase();
  return new DeletePostController(
    validation,
    findPostByIdUseCase,
    deletePostUseCase
  );
};
