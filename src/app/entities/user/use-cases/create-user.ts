import { Injectable } from "@nestjs/common";
import { User } from "../user";
import { UserRepository } from "../user-repository";
import { CreateUserDTO } from "src/infra/http/dtos/create-user-dto";
import { parse } from "path";


@Injectable()

export class CreateUser {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async handle(request: CreateUserDTO): Promise<User> {
        const {first_name, surname, email, password, birthDate} = request
        const name = first_name + surname
        const parsedBirthDate = new Date(birthDate)

        const user = new User({name, email, password, birthDate: parsedBirthDate});
        
        const createdUser = await this.userRepository.create(user)
        return createdUser
    }
}