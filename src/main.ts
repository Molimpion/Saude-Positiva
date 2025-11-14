// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common'; // <-- DELETE
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe()); // <-- DELETE

  // Seu código Swagger permanece
  const config = new DocumentBuilder(); //...
  const document = SwaggerModule.createDocument(app, config); //
  SwaggerModule.setup('api', app, document); //

  await app.listen(3000);
}
bootstrap();
