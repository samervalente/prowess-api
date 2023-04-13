import { Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreatePost } from "src/app/entities/use-cases/create-post";
import { PostViewModel } from "../view-models/post-view-model";
import { GetPostsByAuthor } from "src/app/entities/use-cases/get-by-author";


@Controller("/posts")
export class PostController {
    
    constructor(private createPost: CreatePost, private getPostsByAuthor: GetPostsByAuthor){}

    @Post()
    async create(@Res() res: Response){
        const post = await this.createPost.execute(res.locals.post)
        res.status(HttpStatus.CREATED).send({
        response: 'Post created sucessfully', 
        post: PostViewModel.toHTTP(post)})
    }

    @Get("author")
    async getByAuthor(@Res() res: Response){
        const userId = res.locals.userId
        console.log(userId)
        const posts = await this.getPostsByAuthor.execute(userId)

        res.status(HttpStatus.OK).send({
            posts: posts.map(post => PostViewModel.toHTTP(post))
        })
    }
}