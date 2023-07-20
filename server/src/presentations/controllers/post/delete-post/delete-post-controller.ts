import {
  Controller,
  DeletePost,
  FindPostById,
  HttpRequest,
  HttpResponse,
  InvalidParameterError,
  Validation,
  badRequest,
  serverError,
  ok,
} from "./delete-post-controller-protocols";

export class DeletePostController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly findPostByIdUseCase: FindPostById,
    private readonly deletePostUseCase: DeletePost
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.params);
      if (error) return badRequest(error);

      const { postId } = request.params;
      const post = await this.findPostByIdUseCase.findById(postId);
      if (!post) return badRequest(new InvalidParameterError("postId"));

      const postDeleted = await this.deletePostUseCase.delete(postId);
      if (!postDeleted) return badRequest(new InvalidParameterError("postId"));

      return ok(postDeleted);
    } catch (e) {
      return serverError(e as Error);
    }
  }
}
