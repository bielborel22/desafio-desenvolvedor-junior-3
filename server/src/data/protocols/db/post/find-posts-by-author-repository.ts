import { PostModel } from "../../../../domain/models/post";

export interface FindPostsByAuthorIdRepository {
  findAllByAuthorId(authorId: string): Promise<PostModel[]>;
}
