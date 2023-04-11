import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "src/infra/http/dtos/create-user-dto";
import { User } from "./user";


@Injectable()

export abstract class UserRepository{
    abstract create(user: CreateUserDTO): Promise<User>
}