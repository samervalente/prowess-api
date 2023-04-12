import { Post } from "@prisma/client";


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
            createdAt: post.createdAt
        }
    }
}