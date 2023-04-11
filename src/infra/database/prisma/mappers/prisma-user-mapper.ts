import { User } from "src/app/entities/user/user";
import { User as RawUser } from "@prisma/client";

export class PrismaUserMapper {
    static toPrisma(user: User){
        return {
            id: user.id,
            name: user.name, 
            email: user.email,
            password: user.password,
            birthDate: user.birthDate,
            createdAt: user.createdAt
        }
    }

    static toDomain(raw: RawUser ): User {
        return new User({
            name: raw.name,
            email: raw.email,
            password: raw.password,
            birthDate: raw.birthDate,
            createdAt: raw.createdAt
        }, raw.id)
    }
}