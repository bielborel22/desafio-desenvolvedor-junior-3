import { UserModel } from "../../../../domain/models/user";

export interface FindUserByAccessTokenRepository {
  findByAccessToken(accessToken: string): Promise<UserModel | null>;
}
