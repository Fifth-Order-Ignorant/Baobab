import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';
import { clean } from './clean';

describe('Authentication Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new CustomExceptionsFilter(httpAdapter));

    app.useGlobalPipes(new YupValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  it(`creates & logs in a user correctly`, async () => {
    await request(app.getHttpServer())
      .post('/user/register')
      .send({
        firstName: 'ethan',
        lastName: 'lam',
        email: 'ethan@mail.com',
        password: 'mcs',
      })
      .expect(HttpStatus.CREATED);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'ethan@mail.com', password: 'mcs' })
      .expect(HttpStatus.CREATED);

    expect(res.get('Set-Cookie')).toHaveLength(2);
  });

  it(`fails to register when missing a field`, () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send({
        firstName: 'ethan',
        email: 'ethan@mail.com',
        password: 'mcs',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it(`fails to register when given a non-email`, () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send({
        firstName: 'ethan',
        lastName: 'lam',
        email: 'ethanmail.com',
        password: 'mcs',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it(`fails to register when given a blank name`, () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send({
        firstName: '',
        lastName: '',
        email: 'ethanmail.com',
        password: 'mcs',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it(`fails to register when given a blank password`, () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send({
        firstName: 'a',
        lastName: 'b',
        email: 'ethanmail.com',
        password: '',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it(`doesn't let you register with an existing email`, () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send({
        firstName: 'ethan',
        lastName: 'lam',
        email: 'ethan@mail.com',
        password: 'mcs',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it(`fails login with a bad password`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'ethan@mail.com',
        password: 'mcs1',
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it(`fails login if the account you're trying to create hasn't been created`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'ethan@mail.com',
        password: 'mcs1',
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it(`fails login given an non email string`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'fuck',
        password: 'mcs1',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it(`fails login when missing a field`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        password: 'mcs1',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it(`fails login when password is blank`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'ethan@mail.com',
        password: '',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  afterAll(async () => {
    await clean(app);
    await app.close();
  });
});
