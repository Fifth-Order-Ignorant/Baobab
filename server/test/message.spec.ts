import { MessageInMemory } from '../src/dao/messages';
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

  it(`lets you log in after registering`, () => {
    request(app.getHttpServer()).post('/user/register').send({
      firstName: 'ethan',
      lastName: 'lam',
      email: 'ethan@mail.com',
      password: 'mcs',
    });
    request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'ethan@mail.com',
        password: 'mcs',
      })
    request(app.getHttpServer())
      .post('/message/create')
      .send({
        content: 'hello',
        parentID: undefined,
      })
    
  });
  afterAll(async () => {
    await app.close();
  });
});


describe('Message Basic Functionality', () => {
  it('should create a message with valid id', () => {
    const messages = new MessageInMemory();

    const nowTime = new Date();
    const messageID = messages.createMessage(1, 'hello', nowTime, undefined);
    expect(messages.getByID(messageID).id == messageID);
  });

  it('should return a message given an id', () => {
    const messages = new MessageInMemory();

    const nowTime = new Date();
    const messageID = messages.createMessage(1, 'hello', nowTime, undefined);
    const message = messages.getByID(messageID);
    expect(message.parent == undefined);
  });

});
