import { User } from 'src/entities/user';
import { UserModel } from '../models/user-model';

export abstract class UserRepository {
  abstract create: (user: UserModel) => Promise<User>;
}
