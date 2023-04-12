import { Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreatePost } from "src/app/entities/use-cases/create-post";
import { PostViewModel } from "../view-models/post-view-model";


@Controller("/posts")
export class PostController {
    
    constructor(private createPost: CreatePost){}

    @Post()
    async create(@Res() res: Response){
        const post = await this.createPost.execute(res.locals.post)
        res.status(HttpStatus.CREATED).send({
        response: 'Post created sucessfully', 
        post: PostViewModel.toHTTP(post)})
    }
}