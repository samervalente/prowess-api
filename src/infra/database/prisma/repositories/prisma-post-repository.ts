import { Injectable } from '@nestjs/common';
import { Post } from 'src/app/entities/post/post';
import {
  FilterRequestParams,
  PostRepository,
} from 'src/app/entities/post/post-repository';
import { PrismaService } from '../prisma.service';
import { PrismaPostMapper } from '../mappers/prisma-post-mapper';
import { PostHttpView } from 'src/infra/http/view-models/post-view-model';

@Injectable()
export class PrismaPostRepository implements PostRepository {
  constructor(private prisma: PrismaService) {}

  async create(post: Post): Promise<Post> {
    const raw = PrismaPostMapper.toPrisma(post);
    const createdPost = await this.prisma.post.create({ data: raw });
    return PrismaPostMapper.toDomain(createdPost);
  }
  async countByAuthor(authorId: string): Promise<number> {
    return await this.prisma.post.count({ where: { authorId: authorId } });
  }

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: { authorId: authorId },
    });
    return posts.map((post) => PrismaPostMapper.toDomain(post));
  }

  async filterPosts(
    params: FilterRequestParams,
  ): Promise<{ posts: PostHttpView[]; count: number }> {
    const { state, city, skip, take, gender } = params;
    const posts = await this.prisma.post.findMany({
      skip: Number(skip * take),
      take,
      where: { AND: [{ state }, { city }, { author: { gender } }] },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            birthDate: true,
            gender: true,
            imageUrl: true,
            phone: true,
          },
        },
      },
    });

    const count = await this.prisma.post.count();
    return { posts, count };
  }
}
