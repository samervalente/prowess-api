import { Module } from "@nestjs/common";
import { UserRepository } from "src/app/entities/user/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";


@Module({
    providers:[
        {provide: UserRepository,
        useClass: PrismaUserRepository
        }
    ],
    exports: [UserRepository]
})

export class DatabaseModule{}