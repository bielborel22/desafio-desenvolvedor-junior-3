import { UserModel } from "../../models/user";

export type UserAuthParams = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(data: UserAuthParams): Promise<UserModel | null>;
}
