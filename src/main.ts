import { NestFactory } from '@nestjs/core';
import { AppModule }   from './app.module';

const PORT = process.env.LOCAL_PORT;


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(PORT);
}

bootstrap().then(() => {
  console.log(`Server is running on port ${PORT}`);
});

