import { Post } from "./post";


export abstract class PostRepository {
    abstract create(post: Post): Promise<Post>
}