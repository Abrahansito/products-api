import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    // validar las credenciales del usuario
    if (username !== 'admin' || password !== '123456') {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
