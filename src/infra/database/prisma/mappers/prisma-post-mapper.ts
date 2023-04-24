
import { Post as RawPost } from "@prisma/client"
import { Author, Post } from "src/app/entities/post/post"


export class PrismaPostMapper {
    static toPrisma(post: Post){
        return {
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

    static toDomain(raw: RawPost ): Post {
        const post = new Post({
            authorId: raw.authorId,
            partners: raw.partners,
            contribution: raw.contribution,
            sharedCosts: raw.sharedCosts,
            about: raw.about,
            city: raw.city,
            state: raw.state,
            createdAt: raw.createdAt
        }, raw.id)
        
        return post
    }
}