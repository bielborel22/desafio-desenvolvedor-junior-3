import { DeletePost, DeletePostRepository } from "./delete-post-protocols";

export class DeletePostUseCase implements DeletePost {
  constructor(private readonly deletePostRepository: DeletePostRepository) {}

  async delete(id: string): Promise<boolean> {
    return await this.deletePostRepository.delete(id);
  }
}
