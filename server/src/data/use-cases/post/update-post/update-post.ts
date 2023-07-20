import {
  FindPostByIdRepository,
  PostModel,
  UpdatePost,
  UpdatePostParams,
  UpdatePostRepository,
} from "./update-post-protocols";

export class UpdatePostUseCase implements UpdatePost {
  constructor(
    private readonly findPostByIdRepository: FindPostByIdRepository,
    private readonly updatePostRepository: UpdatePostRepository
  ) {}

  async update(params: UpdatePostParams): Promise<PostModel | null> {
    const post = await this.findPostByIdRepository.findById(params.id);
    if (!post) return null;

    const updatedPost = await this.updatePostRepository.update(params);
    return updatedPost;
  }
}
