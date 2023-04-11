import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./controllers/auth-controller";
import { CreateUser } from "src/app/entities/user/use-cases/create-user";
import { SignUpMiddleware } from "./middlewares/signup-middleware";


@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        CreateUser
    ]
})

export class HttpModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SignUpMiddleware).forRoutes({path: 'auth/signup', method: RequestMethod.POST})
    }
}