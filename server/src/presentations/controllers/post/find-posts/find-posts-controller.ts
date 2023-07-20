import { FindPosts } from "../../../../domain/use-cases/post/find-posts";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  ok,
  serverError,
} from "./find-posts-protocols";

export class FindPostsController implements Controller {
  constructor(private readonly findPostsUseCase: FindPosts) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const posts = await this.findPostsUseCase.find();
      return ok(posts);
    } catch (e) {
      return serverError(e as Error);
    }
  }
}
