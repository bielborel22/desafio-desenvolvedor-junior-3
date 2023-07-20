import { PostModel } from "../../models/post";

export interface FindPosts {
  find(): Promise<PostModel[]>;
}
