import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "../user";
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

        const userOnDB = await this.userRepository.findByEmail(email)
        if(userOnDB){
            throw new ConflictException("User already registered with this email.")
        }

        const name = first_name.concat(` ${surname}`)
        const parsedBirthDate = new Date(birthDate)

        const user = new User({name, email, password, birthDate: parsedBirthDate});
        
        const createdUser = await this.userRepository.create(user)
        return createdUser
    }
}