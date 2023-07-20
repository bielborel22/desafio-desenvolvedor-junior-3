import { UpdatePostController } from "../../../../../presentations/controllers/post/update-post/update-post-controller";
import { Controller } from "../../../../../presentations/protocols";
import { makeUpdatePostUseCase } from "../../../use-cases/post/update-post/update-post-factory";
import { makeUpdatePostControllerValidation } from "./update-post-controller-validation-factory";

export const makeUpdatePostController = (): Controller => {
  const updatePostUseCase = makeUpdatePostUseCase();
  const validation = makeUpdatePostControllerValidation();
  return new UpdatePostController(validation, updatePostUseCase);
};
