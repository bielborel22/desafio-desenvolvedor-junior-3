import { FindPosts } from "../../../../domain/use-cases/post/find-posts";
import { FindPostsRepository } from "../../../protocols/db/post/find-posts-repository";
import { PostModel } from "../find-post-by-id/find-post-by-id-protocols";

export class FindPostsUseCase implements FindPosts {
  constructor(private readonly findPostsRepository: FindPostsRepository) {}

  async find(): Promise<PostModel[]> {
    return await this.findPostsRepository.find();
  }
}
