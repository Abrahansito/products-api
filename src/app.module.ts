import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // disponible en toda la app
    }),
    
    //Configuración de la base de datos supabase
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-us-west-2.pooler.supabase.com',
      port: 5432,
      username: 'postgres.wzjpghhnmcxhdoontrgj',
      password: 'proyecto123@',
      database: 'postgres',
      entities: [User], //Listamos las tablas (Entidades)
      synchronize: false, //True solo en desarrollo (crea las tablas automáticamente)
      ssl: { rejectUnauthorized: false }, //Requerido por Supabase para conexión segura
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