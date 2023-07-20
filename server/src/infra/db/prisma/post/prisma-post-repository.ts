import { CreatePostRepository } from "../../../../data/protocols/db/post/create-post-repository";
import { DeletePostRepository } from "../../../../data/protocols/db/post/delete-post-repository";
import { FindPostByIdRepository } from "../../../../data/protocols/db/post/find-post-by-id-repository";
import { FindPostsByAuthorIdRepository } from "../../../../data/protocols/db/post/find-posts-by-author-repository";
import { FindPostsRepository } from "../../../../data/protocols/db/post/find-posts-repository";
import { UpdatePostRepository } from "../../../../data/protocols/db/post/update-post-repository";
import { PostModel } from "../../../../domain/models/post";
import { CreatePostParams } from "../../../../domain/use-cases/post/create-post";
import { UpdatePostParams } from "../../../../domain/use-cases/post/update-post";
import { PrismaHelper } from "../helper/prisma-helper";

export class PrismaPostRepository
  implements
    CreatePostRepository,
    FindPostByIdRepository,
    DeletePostRepository,
    UpdatePostRepository,
    FindPostsByAuthorIdRepository,
    FindPostsRepository
{
  private readonly prismaClient = PrismaHelper.prismaClient;

  async find(): Promise<PostModel[]> {
    const posts = await this.prismaClient.post.findMany();
    return posts.map(PrismaHelper.mapPostToDomain);
  }

  async findAllByAuthorId(authorId: string): Promise<PostModel[]> {
    const posts = await this.prismaClient.post.findMany({
      where: {
        authorId,
      },
    });
    return posts.map(PrismaHelper.mapPostToDomain);
  }

  async update(params: UpdatePostParams): Promise<PostModel> {
    const { id, title, content } = params;
    const updatedPost = await this.prismaClient.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });
    return PrismaHelper.mapPostToDomain(updatedPost);
  }

  async delete(id: string): Promise<boolean> {
    await this.prismaClient.post.delete({
      where: {
        id,
      },
    });
    return true;
  }

  async findById(id: string): Promise<PostModel | null> {
    const post = await this.prismaClient.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) return null;
    return PrismaHelper.mapPostToDomain(post);
  }

  async create(data: CreatePostParams): Promise<void> {
    const { title, content, authorId } = data;
    await this.prismaClient.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  }
}
