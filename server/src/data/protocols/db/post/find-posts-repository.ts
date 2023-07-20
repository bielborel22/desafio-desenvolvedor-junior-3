import { PostModel } from "../../../../domain/models/post";

export interface FindPostsRepository {
  find(): Promise<PostModel[]>;
}
