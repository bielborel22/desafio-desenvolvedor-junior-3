import {
  FindPostsByAuthorId,
  FindPostsByAuthorIdRepository,
  PostModel,
} from "./find-posts-by-author-protocols";

export class FindPostsByAuthorUseCase implements FindPostsByAuthorId {
  constructor(
    private readonly findPostsByAuthorId: FindPostsByAuthorIdRepository
  ) {}

  async findAllByAuthorId(authorId: string): Promise<PostModel[]> {
    return await this.findPostsByAuthorId.findAllByAuthorId(authorId);
  }
}
