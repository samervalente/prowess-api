import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { validate } from 'class-validator';

@Injectable()
export class SignUpMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { first_name, surname, email, password, gender, imageUrl, phone, birthDate } = req.body
    const user = new CreateUserDTO()
    user.first_name = first_name
    user.surname = surname
    user.email = email
    user.password = password
    user.gender = gender
    user.imageUrl = imageUrl,
    user.phone = phone
    user.birthDate = birthDate

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


    res.locals.user = user;

    next();
  }
}
