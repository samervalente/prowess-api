import { Body, Controller, Post } from "@nestjs/common";
import { CreateUser } from "src/app/entities/user/use-cases/create-user";
import { CreateUserDTO } from "../dtos/create-user-dto";
import { UserViewModel } from "../view-models/user-view-model";


@Controller("auth")
export class UserController{
    constructor(
        private createUser: CreateUser
    ){}

    @Post("sign-up")
    async create(@Body() requestBody: CreateUserDTO){
        const {first_name, surname, email, password, birthDate} = requestBody
        const user = await this.createUser.handle({
            first_name,
            surname,
            email, 
            password,
            birthDate
        })

        return {user: UserViewModel.toHTTP(user)}
    }
}