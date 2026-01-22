import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  email: string;

  @IsNotEmpty()
  password: string;
}