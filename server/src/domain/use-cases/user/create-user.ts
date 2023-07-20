import { UserModel } from "../../models/user";

export type CreateUserModel = Omit<UserModel, "id">;

export interface CreateUser {
  create(user: CreateUserModel): Promise<UserModel | null>;
}
