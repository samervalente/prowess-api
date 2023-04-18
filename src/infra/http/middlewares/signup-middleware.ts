import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { validate } from 'class-validator';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SignUpMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req.files)
    const { firstname, surname, email, password, gender, phone, birthDate } = req.body
    const user = new CreateUserDTO()
    user.firstname = firstname
    user.surname = surname
    user.email = email
    user.password = password
    user.gender = gender
    user.phone = phone
    user.birthDate = birthDate

    const { originalname, buffer } = req.files[0];
    const filename = `${Date.now()}-${originalname}`;
    const filepath = path.resolve(__dirname, '../../../../../uploads', filename);
  

      fs.writeFile(filepath, buffer, (error) => {
        if (error) {
          console.log(error)
        }
      });
 

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
    res.locals.imageFilename = filename

    next();
  }
}
