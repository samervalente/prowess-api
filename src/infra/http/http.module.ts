import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./controllers/auth-controller";
import { CreateUser } from "src/app/entities/user/use-cases/create-user";


@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        CreateUser
    ]
})

export class HttpModule {}