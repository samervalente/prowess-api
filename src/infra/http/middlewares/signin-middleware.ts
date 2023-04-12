import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { SignInDTO } from '../dtos/signin-dto';

@Injectable()
export class SignInMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    const user = new SignInDTO()
    user.email = email
    user.password = password
 
    const errors = await validate(user)
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

    res.locals.requestBody = user;

    next();
  }
}
