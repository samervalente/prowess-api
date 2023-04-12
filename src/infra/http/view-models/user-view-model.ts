import { User } from "@prisma/client";

export class UserViewModel {
    static toHTTP(user: User){
        return {
            id: user.id,
            name: user.name,
            email:user.email,
            password: user.password,
            gender: user.gender,
            imageUrl: user.imageUrl,
            phone: user.phone,
            birthDate:user.birthDate,
            createdAt: user.createdAt,
        }
    }

}