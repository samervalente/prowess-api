import { PostHttpView } from 'src/infra/http/view-models/post-view-model';
import { Post } from './post';
import { Gender } from '@prisma/client';

export interface FilterRequestParams {
  state: string;
  city?: string;
  skip: number;
  take: number;
  gender: Gender;
}

export abstract class PostRepository {
  abstract create(post: Post): Promise<Post>;
  abstract countByAuthor(authorId: string): Promise<number>;
  abstract getPostsByAuthor(authorId: string): Promise<Post[]>;
  abstract filterPosts(
    params: FilterRequestParams,
  ): Promise<{ posts: PostHttpView[]; count: number }>;
}
