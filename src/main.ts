import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('LOCAL_PORT');

  const options = new DocumentBuilder()
    .setTitle('Schooldiary swagger')
    .setDescription('Schooldiary API description')
    .setVersion('1.0')
    .addTag('schooldiary')
    .addServer(`http://localhost:${PORT}/api`)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/profile/swagger', app, document);
  app.setGlobalPrefix('api/');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  app.use(cookieParser());
  await app.listen(PORT).then(() => {
    console.log(
      `Server is running. Swagger endpoint - http://localhost:${PORT}/api/profile/swagger`,
    );
  });
}

bootstrap();
