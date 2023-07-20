import { UserModel } from "../../../../domain/models/user";
import { CreateUserModel } from "../../../../domain/use-cases/user/create-user";

export interface CreateUserRepository {
  create(user: CreateUserModel): Promise<UserModel>;
}
