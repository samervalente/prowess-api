import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/app/entities/user/user-repository";
import { PrismaService } from "../prisma.service";
import { User } from "src/app/entities/user/user";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";


@Injectable()
export class PrismaUserRepository implements UserRepository{
    constructor(private prisma: PrismaService) {
    }

    async create(user: User): Promise<User> {
        const raw = PrismaUserMapper.toPrisma(user);
        const createdUser = await this.prisma.user.create({data: raw})
        return PrismaUserMapper.toDomain(createdUser)
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({where: {email}})
        return user ?  PrismaUserMapper.toDomain(user) : null
    }
}