import { CreateUserRepository } from "../../../../data/protocols/db/user/create-user-repository";
import { FindUserByAccessTokenRepository } from "../../../../data/protocols/db/user/find-user-by-access-token-repository";
import { FindUserByEmailRepository } from "../../../../data/protocols/db/user/find-user-by-email-repository";
import { UpdateAccessTokenRepository } from "../../../../data/protocols/db/user/update-access-token-repository";
import { UserModel } from "../../../../domain/models/user";
import { CreateUserModel } from "../../../../domain/use-cases/user/create-user";
import { PrismaHelper } from "../helper/prisma-helper";

export class PrismaUserRepository
  implements
    CreateUserRepository,
    FindUserByEmailRepository,
    UpdateAccessTokenRepository,
    FindUserByAccessTokenRepository
{
  private readonly prismaClient = PrismaHelper.prismaClient;

  async updateAccessToken(id: string, token: string): Promise<void> {
    await this.prismaClient.user.update({
      where: {
        id,
      },
      data: {
        accessToken: token,
      },
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return null;
    return PrismaHelper.mapUserToDomain(user);
  }

  async create(user: CreateUserModel): Promise<UserModel> {
    const { email, password } = user;
    const createdUser = await this.prismaClient.user.create({
      data: {
        email,
        hashedPassword: password,
      },
    });
    return PrismaHelper.mapUserToDomain(createdUser);
  }

  async findByAccessToken(accessToken: string): Promise<UserModel | null> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        accessToken,
      },
    });
    if (!user) return null;
    return PrismaHelper.mapUserToDomain(user);
  }
}
