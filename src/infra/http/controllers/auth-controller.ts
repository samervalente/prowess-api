import { Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { CreateUser } from "src/app/entities/user/use-cases/create-user";
import { UserViewModel } from "../view-models/user-view-model";
import { Response } from "express";


@Controller("auth")
export class UserController{
    constructor(
        private createUser: CreateUser
    ){}

    @Post("signup")
    async create(@Res() res: Response){
        const user = await this.createUser.handle(res.locals.user)

        res.status(HttpStatus.CREATED).send({
            response: "User registered successfully.",
            user: UserViewModel.toHTTP(user)
        })
    }
}