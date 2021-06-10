import { Role } from './../src/entities/role.entity';
import { RequestInMemory } from '../src/dao/requests';

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';

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

  it(`lets you request a role`, () => {
    request(app.getHttpServer()).post('/user/register').send({
      firstName: 'ethan',
      lastName: 'lam',
      email: 'ethan@mail.com',
      password: 'mcs',
    });
    request(app.getHttpServer()).post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });
    request(app.getHttpServer())
      .post('/request/role')
      .send({
        description: 'i want role',
        role: 'entrepreneur',
      })
      .expect(HttpStatus.CREATED);
  });
  it(`doesn't let you request a bad role`, () => {
    request(app.getHttpServer()).post('/user/register').send({
      firstName: 'ethan',
      lastName: 'lam',
      email: 'ethan@mail.com',
      password: 'mcs',
    });
    request(app.getHttpServer()).post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });
    request(app.getHttpServer())
      .post('/request/role')
      .send({
        description: 'i want role',
        role: 'investorr representative',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('Request Basic Functionality', () => {
  it('should create a request with valid id', () => {
    const requests = new RequestInMemory();

    const requestID = requests.createRequest(
      1,
      'gimme permissions',
      new Date(),
      Role.INVESTOR_REP,
    );
    expect(requests.getById(requestID).id == requestID);
  });

  it('should return a request with requested Role', () => {
    const requests = new RequestInMemory();
    const requestID = requests.createRequest(
      1,
      'gimme permissions',
      new Date(),
      Role.INVESTOR_REP,
    );

    const request = requests.getById(requestID);
    expect(request.role == Role.INVESTOR_REP);
  });
});
