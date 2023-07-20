import {
  FindUserByAccessToken,
  FindUserByAccessTokenRepository,
  UserModel,
} from "./find-user-by-access-token-protocols";

export class FindUserByAccessTokenUseCase implements FindUserByAccessToken {
  constructor(
    private readonly findUserByAccessTokenRepository: FindUserByAccessTokenRepository
  ) {}

  async findByAccessToken(accessToken: string): Promise<UserModel | null> {
    return await this.findUserByAccessTokenRepository.findByAccessToken(
      accessToken
    );
  }
}
