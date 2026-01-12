import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extras
      transform: true, // Transforma los tipos automáticamente
    }),
  );

  // Configurar CORS
  app.enableCors({
    origin: [
      'http://localhost:4200', // Angular local
      'https://products-app-khaki.vercel.app', // Angular deploy
    ],
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicación corriendo en puerto ${port}`);
}
bootstrap();