import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @Length(11, 11, { message: 'Phone must be exactly 11 characters' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  @MinLength(4, { message: 'Address must be at least 4 characters' })
  @MaxLength(255, { message: 'Address cannot exceed 255 characters' })
  address?: string;
}
