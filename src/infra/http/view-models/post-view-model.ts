import { Post } from "@prisma/client";
import { Author } from "src/app/entities/post/post";


export interface PostHttpView extends Post {
    author: Author;
}

export class PostViewModel {
    static toHTTP(post: Post){
        return {
            id: post.id,
            authorId: post.authorId,
            partners: post.partners,
            contribution: post.contribution,
            sharedCosts: post.sharedCosts,
            about: post.about,
            city: post.city,
            state: post.state,
            createdAt: post.createdAt,
        }
    }

    static toQueryHTTP(post: PostHttpView){
        return {
            id: post.id,
            authorId: post.authorId,
            partners: post.partners,
            contribution: post.contribution,
            sharedCosts: post.sharedCosts,
            about: post.about,
            city: post.city,
            state: post.state,
            createdAt: post.createdAt,
            author: {
                name: post.author.name,
                gender: post.author.gender,
                birthDate: post.author.birthDate,
                imageUrl: post.author.imageUrl,
                phone: post.author.phone
            }
        }
    }
}