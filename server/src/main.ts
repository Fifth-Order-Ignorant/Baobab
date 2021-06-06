import { NestFactory } from '@nestjs/core';
import { YupValidationPipe } from './controllers/yup.pipe';
import { AppModule } from './modules/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new YupValidationPipe());
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
