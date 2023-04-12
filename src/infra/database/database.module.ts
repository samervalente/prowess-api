import { Module } from "@nestjs/common";
import { UserRepository } from "src/app/entities/user/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PostRepository } from "src/app/entities/post/post-repository";
import { PrismaPostRepository } from "./prisma/repositories/prisma-post-repository";


@Module({
    providers:[
        PrismaService,
        {
        provide: UserRepository,
        useClass: PrismaUserRepository
        },
        {
        provide: PostRepository,
        useClass: PrismaPostRepository
        }
    ],
    exports: [UserRepository, PostRepository]
})

export class DatabaseModule{}