import { UserModel } from "../../models/user";

export interface FindUserByAccessToken {
  findByAccessToken(accessToken: string): Promise<UserModel | null>;
}
