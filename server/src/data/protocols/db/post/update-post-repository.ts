import { PostModel } from "../../../../domain/models/post";
import { UpdatePostParams } from "../../../../domain/use-cases/post/update-post";

export interface UpdatePostRepository {
  update(params: UpdatePostParams): Promise<PostModel>;
}
