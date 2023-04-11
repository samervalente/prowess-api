import { Module } from "@nestjs/common";
import { UserRepository } from "src/app/entities/user/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { PrismaService } from "./prisma/prisma.service";


@Module({
    providers:[
        PrismaService,
        {
        provide: UserRepository,
        useClass: PrismaUserRepository
        }
    ],
    exports: [UserRepository]
})

export class DatabaseModule{}