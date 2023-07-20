import {
  FindPostById,
  FindPostByIdRepository,
  PostModel,
} from "./find-post-by-id-protocols";

export class FindPostByIdUseCase implements FindPostById {
  constructor(
    private readonly findPostByIdRepository: FindPostByIdRepository
  ) {}

  async findById(id: string): Promise<PostModel | null> {
    const post = await this.findPostByIdRepository.findById(id);
    if (!post) return null;
    return post;
  }
}
