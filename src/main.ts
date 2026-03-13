import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { envVars } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envVars.PORT ?? 3000);
}
bootstrap();
