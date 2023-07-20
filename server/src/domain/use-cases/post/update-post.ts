import { PostModel } from "../../models/post";

export type UpdatePostParams = {
  id: string;
  title?: string;
  content?: string;
};

export interface UpdatePost {
  update(params: UpdatePostParams): Promise<PostModel | null>;
}
