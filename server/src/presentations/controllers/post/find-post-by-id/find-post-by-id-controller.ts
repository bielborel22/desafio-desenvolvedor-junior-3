import {
  Controller,
  FindPostById,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
  Validation,
  badRequest,
} from "./find-post-by-id-controller-protocols";

export class FindPostByIdController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly findPostByIdUseCase: FindPostById
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.params);
      if (error) return badRequest(error);

      const { postId } = request.params;

      const post = await this.findPostByIdUseCase.findById(postId);

      return ok(post);
    } catch (e) {
      return serverError(e as Error);
    }
  }
}
