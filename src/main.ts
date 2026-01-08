import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // para pruebas (luego se restringe)
    methods: 'GET,POST,PUT,PATCH,DELETE',
  });

  await app.listen(3000);
}
bootstrap();
