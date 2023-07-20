import {
  Authentication,
  Encrypter,
  FindUserByEmailRepository,
  HashComparer,
  UpdateAccessTokenRepository,
  UserAuthParams,
  UserModel,
} from "./authentication-protocols";

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(data: UserAuthParams): Promise<UserModel | null> {
    const user = await this.findUserByEmailRepository.findByEmail(data.email);
    if (!user) return null;

    const passwordMatches = await this.hashComparer.compare(
      data.password,
      user.password
    );
    if (!passwordMatches) return null;

    const accessToken = await this.encrypter.encrypt(user.id);
    await this.updateAccessTokenRepository.updateAccessToken(
      user.id,
      accessToken
    );

    user.accessToken = accessToken;
    return user;
  }
}
