import { Injectable } from "@nestjs/common";
import { User } from "./user";


@Injectable()

export abstract class UserRepository{
    abstract create(user: User): Promise<User>
    abstract findByEmail(email: string): Promise<User | null>
}