import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    //Configuración de la base de datos supabase
    TypeOrmModule.forRoot({
      type: 'postgres',
      //Cadena de conexión de la base de datos
      url: 'postgresql://postgres:proyecto123@@db.wzjpghhnmcxhdoontrgj.supabase.co:5432/postgres', 
      entities: [User], //Listamos las tablas (Entidades)
      synchronize: false, //True solo en desarrollo (crea las tablas automáticamente)
      ssl: { rejectUnauthorized: false }, //Requerido por Supabase para conexión segura
      extra:{
        family: 4,  
      }
    }),

    //Módulos
    ProductsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}