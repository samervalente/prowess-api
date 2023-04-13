import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../user-repository";
import * as jwt from 'jsonwebtoken'
import { Encrypter } from "src/app/protocols/encrypter";
import { PostRepository } from "../../post/post-repository";

type SignInRequestBody = {
    email:string;
    password: string
}

type SignInResponseBody = {
    name: string;
    email:string;
    countPosts: number;
    token: string;
}

@Injectable()
export class SignInUser{
    private userRepository: UserRepository;
    private postRepository: PostRepository;
    private encrypter: Encrypter;
    constructor(userRepository: UserRepository, postRepository: PostRepository,  @Inject('Encrypter') encrypter: Encrypter){
        this.userRepository = userRepository;
        this.encrypter = encrypter;
        this.postRepository = postRepository;
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

        const countPosts = await this.postRepository.countByAuthor(user.id)
        const secret_key = process.env.JWT_SECRET
        const token = jwt.sign({userId: user.id}, secret_key)
    
        return {name: user.name, email: user.email, countPosts, token}

    }
}