import { PostModel } from "../../models/post";

export type CreatePostParams = Omit<
  PostModel,
  "id" | "createdAt" | "updatedAt"
>;

export interface CreatePost {
  create(data: CreatePostParams): Promise<void>;
}
