import { Gender } from '@prisma/client';
import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsEnum, IsOptional, } from 'class-validator';

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
  @MinLength(8, { message: 'password must have at least 8 characters' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  imageUrl?: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{2}\s*(?:\d{4,5}\s*)?(?:\d{4}\s*)?$/, {message: 'invalid phone number'})
  phone: string;

  @IsNotEmpty()
  @Matches(/^(0?[1-9]|[12][0-9]|3[01])[./](0?[1-9]|1[012])[./]\d{4}$/, {message: 'birthDate must be a valid date string in the format DD/MM/YYYY'})
  birthDate: string;
}
