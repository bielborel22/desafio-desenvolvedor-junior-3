import { UserModel } from "../../../../domain/models/user";

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<UserModel | null>;
}
