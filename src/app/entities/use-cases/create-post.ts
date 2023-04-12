import { Injectable } from "@nestjs/common";
import { PostRepository } from "../post/post-repository";
import { Post } from "../post/post";


@Injectable()

export class CreatePost{
    private postRepository: PostRepository

    constructor(postRepository: PostRepository){
        this.postRepository = postRepository
    }

    async execute(request: Post){
        const post = new Post(request)
        return await this.postRepository.create(post)
    }
}