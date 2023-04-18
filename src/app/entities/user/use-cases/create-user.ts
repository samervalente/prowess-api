import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { User } from "../user";
import { UserRepository } from "../user-repository";
import { CreateUserDTO } from "src/infra/http/dtos/create-user-dto";
import { Encrypter } from "src/app/protocols/encrypter";
import { MasksHelper } from "src/helpers/masks";
import { CloudinaryService } from "src/infra/utils/cloudinary/cloudinary.service";
import * as fs from 'fs'

interface Request extends CreateUserDTO {
    imageFilename: string;
    imageUrl: string;
}

@Injectable()
export class CreateUser {
    private userRepository: UserRepository
    private encrypter: Encrypter;
    private cloudinaryService: CloudinaryService
    constructor(userRepository: UserRepository, @Inject('Encrypter') encrypter: Encrypter, cloudinaryService: CloudinaryService){
        this.userRepository = userRepository;
        this.encrypter = encrypter;
        this.cloudinaryService = cloudinaryService
    }

    async execute(request: Request): Promise<User> {
        const {firstname, surname, email, password, imageUrl, imageFilename, birthDate, gender, phone} = request
        const maskHelper = new MasksHelper()
        
        const userWithEmail = await this.userRepository.findByEmail(email)
        if(userWithEmail)  throw new ConflictException("User already registered with this email.")

        const userWithPhone = await this.userRepository.findByPhone(maskHelper.maskPhone(phone))
        if(userWithPhone) throw new ConflictException("User already registered with this phone number.")

        const hashPassword = await this.encrypter.encrypt(password);
        const name = firstname.concat(` ${surname}`)
        const parsedBirthDate = new Date(birthDate)
      
        const maskedPhone = maskHelper.maskPhone(phone)
        const {secure_url} = await this.cloudinaryService.upload(imageFilename)
        fs.unlink(`./uploads/${imageFilename}`, (err) => {
            if(err){
              console.log(err);
              return;
            }
          })

        const user = new User({name, email, password: hashPassword, gender, imageUrl: secure_url, phone:maskedPhone, birthDate: parsedBirthDate});
        
        const createdUser = await this.userRepository.create(user)
        return createdUser
    }
}
