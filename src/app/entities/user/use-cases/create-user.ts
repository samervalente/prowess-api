import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { User } from "../user";
import { UserRepository } from "../user-repository";
import { CreateUserDTO } from "src/infra/http/dtos/create-user-dto";
import { Encrypter } from "src/app/protocols/encrypter";

@Injectable()
export class CreateUser {
    private userRepository: UserRepository
    private encrypter: Encrypter;
    constructor(userRepository: UserRepository, @Inject('Encrypter') encrypter: Encrypter){
        this.userRepository = userRepository;
        this.encrypter = encrypter;
    }

    async handle(request: CreateUserDTO): Promise<User> {
        const {first_name, surname, email, password, birthDate} = request

        const userOnDB = await this.userRepository.findByEmail(email)
        if(userOnDB){
            throw new ConflictException("User already registered with this email.")
        }

        const hashPassword = await this.encrypter.encrypt(password);
        const name = first_name.concat(` ${surname}`)
        const parsedBirthDate = new Date(birthDate)
        

        const user = new User({name, email, password: hashPassword, birthDate: parsedBirthDate});
        
        const createdUser = await this.userRepository.create(user)
        return createdUser
    }
}
