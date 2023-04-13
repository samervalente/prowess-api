import { ForbiddenException, Injectable } from "@nestjs/common";
import { PostRepository } from "../post/post-repository";
import { Post } from "../post/post";


@Injectable()

export class CreatePost{
    private postRepository: PostRepository

    constructor(postRepository: PostRepository){
        this.postRepository = postRepository
    }

    async execute(request: Post){

        const countPost = await this.postRepository.countByAuthor(request.authorId)
        if(countPost === 3) throw new ForbiddenException("maximum limit of 3 posts reached")

        const post = new Post(request)
        return await this.postRepository.create(post)
    }
}