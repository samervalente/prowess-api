import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./controllers/auth-controller";
import { CreateUser } from "src/app/entities/user/use-cases/create-user";
import { SignUpMiddleware } from "./middlewares/signup-middleware";
import { BcryptAdapter } from "../encryptography/bcrypt-adapter";
import { SignInUser } from "src/app/entities/user/use-cases/signin";
import { SignInMiddleware } from "./middlewares/signin-middleware";
import { TokenValidatorMiddleware } from "./middlewares/token-validator-middleware";
import { CreatePostMiddleware } from "./middlewares/create-post-middleware";
import { PostController } from "./controllers/post-controller";
import { CreatePost } from "src/app/entities/use-cases/create-post";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController, PostController],
    providers: [
        CreateUser,
        SignInUser,
        CreatePost,
        {
            provide: 'Encrypter',
            useFactory: () => {
                return new BcryptAdapter(12);
            },
        }
    ]
})

export class HttpModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SignUpMiddleware).forRoutes({path: 'auth/signup', method: RequestMethod.POST}),
        consumer.apply(SignInMiddleware).forRoutes({path: 'auth/signin', method: RequestMethod.POST}),
        consumer.apply(TokenValidatorMiddleware).forRoutes({path: '/posts', method: RequestMethod.ALL})
        consumer.apply(CreatePostMiddleware).forRoutes({path: '/posts', method: RequestMethod.POST})
    }
}