import { CreatePostParams } from "../../../../domain/use-cases/post/create-post";

export interface CreatePostRepository {
  create(data: CreatePostParams): Promise<void>;
}
