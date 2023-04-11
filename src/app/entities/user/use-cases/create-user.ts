import { Injectable } from "@nestjs/common";
import { User, UserProps } from "../user";
import { UserRepository } from "../user-repository";
import { CreateUserDTO } from "src/infra/http/dtos/create-user-dto";


@Injectable()

export class CreateUser {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async handle(request: CreateUserDTO): Promise<User> {
        const {first_name, surname, email, password, birthDate} = request
        const user = new User(first_name, surname, email, password, birthDate);
        const {}
    }
}