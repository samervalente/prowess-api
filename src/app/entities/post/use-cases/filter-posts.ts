import { Injectable } from "@nestjs/common";
import { FilterRequestParams, PostRepository } from "../post-repository";


@Injectable()
export class FilterPosts{
    constructor(private postRepository: PostRepository){}

    async execute(params: FilterRequestParams){
        const posts = await this.postRepository.filterPosts(params)
        return posts
    }
}