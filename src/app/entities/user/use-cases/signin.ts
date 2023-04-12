import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../user-repository";
import * as jwt from 'jsonwebtoken'
import { Encrypter } from "src/app/protocols/encrypter";

type SignInRequestBody = {
    email:string;
    password: string
}

type SignInResponseBody = {
    name: string;
    email:string;
    token: string;
}

@Injectable()
export class SignInUser{
    private userRepository: UserRepository
    private encrypter: Encrypter;
    constructor(userRepository: UserRepository,  @Inject('Encrypter') encrypter: Encrypter){
        this.userRepository = userRepository
        this.encrypter = encrypter;
    }

    async execute(request: SignInRequestBody): Promise<SignInResponseBody>{
        const user = await this.userRepository.findByEmail(request.email)
        if(!user){
            throw new NotFoundException("User not found.")
        }

        const isCorrectPassowrd = await this.encrypter.compare(request.password, user.password)
        if(!isCorrectPassowrd){
            throw new UnauthorizedException("Incorrect password.")
        }

        const secret_key = process.env.JWT_SECRET
        console.log(secret_key)
        const token = jwt.sign({userId: user.id}, secret_key)
        return {name: user.name, email: user.email, token}

    }
}