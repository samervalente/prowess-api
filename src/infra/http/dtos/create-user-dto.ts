import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  @MinLength(3, { message: 'password must have at least 3 characters' })
  password: string;

  @IsNotEmpty()
  @IsString()
  birthDate: string;
}
