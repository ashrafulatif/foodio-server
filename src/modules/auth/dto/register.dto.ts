import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsEmail({}, { message: 'Valid email is required' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @MinLength(4, { message: 'Address must be at least 4 characters long' })
  address: string;

  @IsOptional()
  @IsString()
  @MinLength(11, { message: 'Phone must be at least 11 characters long' })
  phone?: string;
}
