import { Post } from "./post";


export interface FilterRequestParams {
    state: string
    city?: string
    skip: number;
    take:number;
}

export abstract class PostRepository {
    abstract create(post: Post): Promise<Post>
    abstract countByAuthor(authorId: string): Promise<number>
    abstract getPostsByAuthor(authorId: string): Promise<Post[]>
    abstract filterPosts(params: FilterRequestParams): Promise<Post[]>
}