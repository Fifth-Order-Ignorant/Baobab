import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { YupValidationPipe } from './controllers/yup.pipe';
import { AppModule } from './modules/app.module';
import * as cookieParser from 'cookie-parser';
import { CustomExceptionsFilter } from './controllers/unauthorized.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CustomExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new YupValidationPipe());
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
