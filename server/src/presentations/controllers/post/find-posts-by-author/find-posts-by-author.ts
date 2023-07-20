import { Validation } from "../create-post/create-post-controller-protocols";
import {
  Controller,
  FindPostsByAuthorId,
  HttpRequest,
  HttpResponse,
  MissingParameterError,
  badRequest,
  ok,
  serverError,
} from "./find-posts-by-author-protocols";

export class FindPostsByAuthorController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly findPostsByAuthorUseCase: FindPostsByAuthorId
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.params);
      if (error) return badRequest(error);

      const { authorId } = request.params;
      const posts = await this.findPostsByAuthorUseCase.findAllByAuthorId(
        authorId
      );

      return ok(posts);
    } catch (e) {
      return serverError(e as Error);
    }
  }
}
