import { PostModel } from "../../models/post";

export interface FindPostsByAuthorId {
  findAllByAuthorId(authorId: string): Promise<PostModel[]>;
}
