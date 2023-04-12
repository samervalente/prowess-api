import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class TokenValidatorMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization']
    if(!authorization)  throw new UnauthorizedException("Missing authorization header")
     
    const token = authorization.replace('Bearer ', '')
    if(!token) throw new UnauthorizedException("Missing token")

    try {
      const JWT_SECRET = process.env.JWT_SECRET
      const {userId} = jwt.verify(token, JWT_SECRET) as {userId: string}

      res.locals.userId = userId
      next()

    } catch (error) {
      throw new UnauthorizedException("Invalid token")
    }
  }
}
