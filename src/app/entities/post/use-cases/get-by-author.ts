import { Injectable } from "@nestjs/common";
import { PostRepository } from "../post-repository";

@Injectable()
export class GetPostsByAuthor{
    private postRepository: PostRepository
    constructor(postRepository: PostRepository){
        this.postRepository = postRepository
    }

    async execute(authorId: string){
        return await this.postRepository.getPostsByAuthor(authorId)
    }

}