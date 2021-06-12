import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { YupValidationPipe } from './controllers/yup.pipe';
import { AppModule } from './modules/app.module';
import * as cookieParser from 'cookie-parser';
import { CustomExceptionsFilter } from './controllers/unauthorized.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CustomExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new YupValidationPipe());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Baobab Server')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
