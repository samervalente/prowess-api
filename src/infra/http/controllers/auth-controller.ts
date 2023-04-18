import { Controller, HttpStatus, Post, Res} from "@nestjs/common";
import { CreateUser } from "src/app/entities/user/use-cases/create-user";
import { UserViewModel } from "../view-models/user-view-model";
import { Response } from "express";
import { SignInUser } from "src/app/entities/user/use-cases/signin";

@Controller("auth")
export class UserController{
    constructor(
        private createUser: CreateUser,
        private signInUser: SignInUser,
    ){}

    @Post("signup")
    async create(@Res() res: Response){
     
        const body = {...res.locals.user}
        const user = await this.createUser.execute(body)
    
        res.status(HttpStatus.CREATED).send({
            statusCode:201,
            response: "User registered successfully",
            user
        })
    }

    @Post("signin")
    async signin(@Res() res: Response){
        const signInRequestBody = res.locals.requestBody
        const user = await this.signInUser.execute((signInRequestBody))

        res.status(HttpStatus.OK).send({
            response: "User logged",
            user,
        })
    }
}