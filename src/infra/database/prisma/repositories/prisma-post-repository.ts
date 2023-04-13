import { Injectable } from "@nestjs/common";
import { Post } from "src/app/entities/post/post";
import { PostRepository } from "src/app/entities/post/post-repository";
import { PrismaService } from "../prisma.service";
import { PrismaPostMapper } from "../mappers/prisma-post-mapper";


@Injectable()
export class PrismaPostRepository implements PostRepository {
        constructor(private prisma: PrismaService){}

    async create(post: Post): Promise<Post> {
        const raw = PrismaPostMapper.toPrisma(post);
        const createdPost =  await this.prisma.post.create({data: raw})
        return PrismaPostMapper.toDomain(createdPost)
    }
    async countByAuthor(authorId: string): Promise<number> {
        return await this.prisma.post.count({where: {authorId: authorId}})
    }

    async getPostsByAuthor(authorId: string): Promise<Post[]> {
        const posts =  await this.prisma.post.findMany({where: {authorId: authorId}})
        return posts.map(post => PrismaPostMapper.toDomain(post))
    }
    
}