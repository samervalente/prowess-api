import { UserProps } from 'src/entities/user';

export type UserModel = Omit<UserProps, 'id' | 'createdAt'>;
