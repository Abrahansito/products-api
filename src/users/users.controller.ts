import { Controller, Get, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';     

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) //Protegido con Token y Roles
export class UsersController {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  @Get()
  @SetMetadata('roles', ['admin']) //Solo admin puede entrar
  findAll() {
    return this.userRepo.find({
        order: { created_at: 'DESC' }
    });
  }

  //Actualizar para cambiar rol o nombre
  @Patch(':id')
  @SetMetadata('roles', ['admin'])
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userRepo.update(id, updateUserDto);
    return this.userRepo.findOneBy({ id });
  }

  //Eliminar usuario
  @Delete(':id')
  @SetMetadata('roles', ['admin'])
  async remove(@Param('id') id: string) {
    await this.userRepo.delete(id);
    return { message: 'Usuario eliminado' };
  }
}