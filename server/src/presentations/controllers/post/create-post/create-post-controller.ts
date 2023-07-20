import {
  Controller,
  CreatePost,
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  created,
  serverError,
  unauthorized,
} from "./create-post-controller-protocols";

export class CreatePostController implements Controller {
  constructor(
    private readonly validation: Validation,
    private createPost: CreatePost
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body);
      if (error) return badRequest(error);

      const { title, content } = request.body;
      const { userId } = request;

      if (!userId) return unauthorized();
      await this.createPost.create({ title, content, authorId: userId });

      return created({});
    } catch (e) {
      return serverError(e as Error);
    }
  }
}
