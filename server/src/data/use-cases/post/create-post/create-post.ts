import {
  CreatePost,
  CreatePostParams,
  CreatePostRepository,
} from "./create-post-protocols";

export class CreatePostUseCase implements CreatePost {
  constructor(private readonly createPostRepository: CreatePostRepository) {}

  async create(data: CreatePostParams): Promise<void> {
    await this.createPostRepository.create(data);
  }
}
