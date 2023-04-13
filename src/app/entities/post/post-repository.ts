import { Post } from "./post";


export abstract class PostRepository {
    abstract create(post: Post): Promise<Post>
    abstract countByAuthor(authorId: string): Promise<number>
    abstract getPostsByAuthor(authorId: string): Promise<Post[]>
}