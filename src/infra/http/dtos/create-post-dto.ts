import { IsNotEmpty, IsUUID } from "class-validator";


export class CreatePostDTO {

    @IsUUID()
    @IsNotEmpty()
    authorId: string

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