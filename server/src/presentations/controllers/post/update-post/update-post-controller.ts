import {
  UpdatePost,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
  serverError,
} from "./update-post-protocols";

export class UpdatePostController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updatePostUseCase: UpdatePost
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);
      if (error) return badRequest(error);

      const { postId } = request.params;
      const { title, content } = request.body;

      const post = await this.updatePostUseCase.update({
        id: postId,
        title,
        content,
      });

      return ok(post);
    } catch (e) {
      return serverError(e as Error);
    }
  }
}
