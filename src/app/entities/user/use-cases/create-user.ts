import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { User } from "../user";
import { UserRepository } from "../user-repository";
import { CreateUserDTO } from "src/infra/http/dtos/create-user-dto";
import { Encrypter } from "src/app/protocols/encrypter";
import { MasksHelper } from "src/helpers/masks";

@Injectable()
export class CreateUser {
    private userRepository: UserRepository
    private encrypter: Encrypter;
    constructor(userRepository: UserRepository, @Inject('Encrypter') encrypter: Encrypter){
        this.userRepository = userRepository;
        this.encrypter = encrypter;
    }

    async execute(request: CreateUserDTO): Promise<User> {
        const {first_name, surname, email, password, birthDate, gender, imageUrl, phone} = request
        const maskHelper = new MasksHelper()
        
        const userWithEmail = await this.userRepository.findByEmail(email)
        if(userWithEmail)  throw new ConflictException("User already registered with this email.")

        const userWithPhone = await this.userRepository.findByPhone(maskHelper.maskPhone(phone))
        if(userWithPhone) throw new ConflictException("User already registered with this phone number.")

        const hashPassword = await this.encrypter.encrypt(password);
        const name = first_name.concat(` ${surname}`)
        const parsedBirthDate = new Date(birthDate)
      
        const maskedPhone = maskHelper.maskPhone(phone)

        const user = new User({name, email, password: hashPassword, gender, imageUrl, phone:maskedPhone, birthDate: parsedBirthDate});
        
        const createdUser = await this.userRepository.create(user)
        return createdUser
    }
}
