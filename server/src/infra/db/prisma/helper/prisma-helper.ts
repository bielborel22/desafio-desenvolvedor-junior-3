import { PrismaClient } from "@prisma/client";
import { PostModel } from "../../../../domain/models/post";
import { UserModel } from "../../../../domain/models/user";

export const PrismaHelper = {
  prismaClient: new PrismaClient({
    log: ["query", "info", "warn"],
  }),

  async connect(): Promise<void> {
    await this.prismaClient.$connect();
  },

  async disconnect(): Promise<void> {
    await this.prismaClient.$disconnect();
  },

  mapUserToDomain(model: any): UserModel {
    return {
      id: model.id,
      email: model.email,
      password: model.hashedPassword,
      accessToken: model.accessToken,
    };
  },

  mapPostToDomain(model: any): PostModel {
    return {
      id: model.id,
      title: model.title,
      content: model.content,
      authorId: model.authorId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  },
};
