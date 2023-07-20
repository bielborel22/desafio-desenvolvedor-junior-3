import {
  CreateUser,
  CreateUserModel,
  CreateUserRepository,
  FindUserByEmailRepository,
  Hasher,
  UserModel,
} from "./create-user-protocols";

export class CreateUserUseCase implements CreateUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository
  ) {}

  async create(data: CreateUserModel): Promise<UserModel | null> {
    const userExists = await this.findUserByEmailRepository.findByEmail(
      data.email
    );
    if (!!userExists) return null;

    const hashedPassword = await this.hasher.hash(data.password);
    const user = Object.assign({}, data, { password: hashedPassword });
    const createdUser = await this.createUserRepository.create(user);

    return createdUser;
  }
}
