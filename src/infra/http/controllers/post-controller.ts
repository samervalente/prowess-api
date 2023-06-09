import { Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePost } from 'src/app/entities/post/use-cases/create-post';
import { PostViewModel } from '../view-models/post-view-model';
import { GetPostsByAuthor } from 'src/app/entities/post/use-cases/get-by-author';
import { FilterPosts } from 'src/app/entities/post/use-cases/filter-posts';
import { Gender } from '@prisma/client';

@Controller('/posts')
export class PostController {
  constructor(
    private createPost: CreatePost,
    private getPostsByAuthor: GetPostsByAuthor,
    private filterPosts: FilterPosts,
  ) {}

  @Post()
  async create(@Res() res: Response) {
    const post = await this.createPost.execute(res.locals.post);
    res.status(HttpStatus.CREATED).send({
      response: 'Post created sucessfully',
      post: PostViewModel.toHTTP(post),
    });
  }

  @Get('author')
  async getByAuthor(@Res() res: Response) {
    const userId = res.locals.userId;
    console.log(userId);
    const posts = await this.getPostsByAuthor.execute(userId);

    res.status(HttpStatus.OK).send({
      posts: posts.map((post) => PostViewModel.toHTTP(post)),
    });
  }

  @Get()
  async getPosts(
    @Query('state') state: string,
    @Query('city') city: string,
    @Query('gender') gender: Gender,
    @Res() res: Response,
    @Query('skip') skip = 0,
    @Query('take') take = 3,
  ) {
    const { posts, count } = await this.filterPosts.execute({
      state,
      city,
      skip: Number(skip),
      take: Number(take),
      gender,
    });

    res.status(HttpStatus.OK).send({
      posts: posts.map((post) => PostViewModel.toQueryHTTP(post)),
      count,
    });
  }
}
