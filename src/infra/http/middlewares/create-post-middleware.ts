import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { CreatePostDTO } from '../dtos/create-post-dto';

@Injectable()
export class CreatePostMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { partners, contribution, sharedCosts, about, city, state } = req.body
    const post = new CreatePostDTO()
    post.partners = partners
    post.contribution = contribution
    post.sharedCosts = sharedCosts
    post.about = about
    post.city = city
    post.state = state

    const errors = await validate(post)
    if (errors.length > 0) {
      const allErrors = errors.map((error) => (
        {
          constraint: error.constraints
        }
      ))

      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({
        statusCode: 422,
        error: 'Unprocessable Entity',
        messages: allErrors
      })
    }


    res.locals.post = {...post, authorId: res.locals.userId};

    next();
  }
}
