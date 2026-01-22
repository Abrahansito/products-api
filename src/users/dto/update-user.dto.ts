import { IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: 'El rol debe ser admin o user' })
  role?: string;
}