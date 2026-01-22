import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty() @IsString()
  full_name: string;

  @IsEmail({}, { message: 'Correo inválido' })
  email: string;

  @MinLength(6, { message: 'Mínimo 6 caracteres' })
  password: string;
}