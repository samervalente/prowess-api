import { IsNotEmpty, IsUUID } from "class-validator";


export class CreatePostDTO {
    @IsNotEmpty()
    partners: string

    @IsNotEmpty()
    contribution: number

    @IsNotEmpty()
    sharedCosts?: string

    @IsNotEmpty()
    about: string

    @IsNotEmpty()
    city: string

    @IsNotEmpty()
    state: string
}