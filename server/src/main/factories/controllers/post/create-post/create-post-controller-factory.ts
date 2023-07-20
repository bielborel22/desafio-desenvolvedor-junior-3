import { CreatePostController } from "../../../../../presentations/controllers/post/create-post/create-post-controller";
import { Controller } from "../../../../../presentations/protocols";
import { makeCreatePostUseCase } from "../../../use-cases/post/create-post/create-post-factory";
import { makeCreatePostValidation } from "./create-post-controller-validation-factory";

export const makeCreatePostController = (): Controller => {
  const validation = makeCreatePostValidation();
  const createPostUseCase = makeCreatePostUseCase();
  return new CreatePostController(validation, createPostUseCase);
};
