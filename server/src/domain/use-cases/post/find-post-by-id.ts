import { PostModel } from "../../models/post";

export interface FindPostById {
  findById(id: string): Promise<PostModel | null>;
}
