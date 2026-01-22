import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //REGISTRO
  async register(registerDto: RegisterDto) {
    const { email, password, full_name } = registerDto;

    //Verificar duplicados
    const userExists = await this.userRepository.findOneBy({ email });
    if (userExists) throw new BadRequestException('El correo ya está registrado');

    //Hashear password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Guardar como rol user
    const newUser = this.userRepository.create({
      full_name,
      email,
      password: hashedPassword,
      role: 'user', 
    });

    await this.userRepository.save(newUser);

    return { message: 'Usuario creado exitosamente' };
  }

  //LOGIN
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    //Buscamos usuario y pedimos el password
    const user = await this.userRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    //Payload del Token
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      role: user.role, //Devolvemos el rol para que Angular sepa a dónde redirigir
      username: user.full_name
    };
  }
}