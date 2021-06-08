import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';
import Cookie from 'js-cookie';

describe('AppController (e2e)', () => {
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
    jest.mock('js-cookie', () => jest.fn());
    await app.init();
  });

  it(`creates a user correctly`, () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send({
        firstName: 'ethan',
        lastName: 'lam',
        email: 'ethan@mail.com',
        password: 'mcs',
      })
      .expect(HttpStatus.CREATED);
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
  it(`fails to register when given an extra field`, () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send({
        firstName: 'ethan',
        email: 'ethan@mail.com',
        fuck: 'me',
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
    request(app.getHttpServer()).post('/user/register').send({
      firstName: 'ethan',
      lastName: 'lam',
      email: 'ethan@mail.com',
      password: 'mcs',
    });
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
  it(`lets you log in after registering`, () => {
    request(app.getHttpServer()).post('/user/register').send({
      firstName: 'ethan',
      lastName: 'lam',
      email: 'ethan@mail.com',
      password: 'mcs',
    });
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'ethan@mail.com',
        password: 'mcs',
      })
      .expect(HttpStatus.CREATED);
  });
  it(`fails login with a bad password`, () => {
    request(app.getHttpServer()).post('/user/register').send({
      firstName: 'ethan',
      lastName: 'lam',
      email: 'ethan@mail.com',
      password: 'mcs',
    });
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
  it(`fails login with extra fields`, () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'ethan@mail.com',
        password: 'mcs',
        fuck: 'me',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  afterAll(async () => {
    await app.close();
  });
});
