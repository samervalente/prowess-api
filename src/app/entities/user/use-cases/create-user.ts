import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { User } from "../user";
import { UserRepository } from "../user-repository";
import { CreateUserDTO } from "src/infra/http/dtos/create-user-dto";
import { Encrypter } from "src/app/protocols/encrypter";
import { MasksHelper } from "src/helpers/masks";
import { CloudinaryService } from "src/infra/utils/cloudinary/cloudinary.service";
import * as fs from 'fs'
import * as path from 'path';

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

    async execute(request: CreateUserDTO): Promise<User> {

        const {firstname, surname, email, password, image, birthDate, gender, phone} = request
        const maskHelper = new MasksHelper()
        
        const userWithEmail = await this.userRepository.findByEmail(email)
        if(userWithEmail)  throw new ConflictException("User already registered with this email.")

        const hashPassword = await this.encrypter.encrypt(password);
        const name = firstname.concat(` ${surname}`)
        const parsedBirthDate = new Date(birthDate)
        const maskedPhone = maskHelper.maskPhone(phone)

        if(typeof image !== "string"){
            const {originalname, buffer} = image
            const filename = `${Date.now()}-${originalname}`;
            const filepath = path.resolve(__dirname, '../../../../../../uploads', filename);
    
            fs.writeFile(filepath, buffer, (error) => {
                if (error) {
                  console.log(error)
                }
              });
    
            const {secure_url} = await this.cloudinaryService.upload(filename)
            fs.unlink(`./uploads/${filename}`, (err) => {
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
}
