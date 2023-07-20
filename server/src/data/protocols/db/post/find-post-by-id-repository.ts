import { PostModel } from "../../../../domain/models/post";

export interface FindPostByIdRepository {
  findById(id: string): Promise<PostModel | null>;
}
