import { MessageInMemory } from '../src/dao/messages';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';

describe('Message Creation Tests', () => {
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

  it(`lets you create a message with no parent`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/user/register').send({
      firstName: 'ethan',
      lastName: 'lam',
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/message/create')
      .send({
        content: 'hello1',
        parentID: -1,
      })
      .expect(HttpStatus.CREATED);
  });

  it(`lets you create a message with a parent`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/message/create')
      .send({
        content: 'hello2',
        parentID: 0,
      })
      .expect(HttpStatus.CREATED);
  });

  it(`doesn't let you create a message with a bad parent`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/message/create')
      .send({
        content: 'hello3',
        parentID: 3,
      })
      .expect(HttpStatus.BAD_REQUEST);
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

  it('lets you create a message with a parent', () => {
    const messages = new MessageInMemory();

    const nowTime = new Date();
    const message1 = messages.createMessage(1, 'hello', nowTime, undefined);
    const parentMessage = messages.getByID(message1);
    const message2 = messages.createMessage(
      1,
      'hello2',
      nowTime,
      parentMessage,
    );
    const message = messages.getByID(message2);
    expect(message.parent == parentMessage);
  });
});

describe('Message Pagination Basic Functionality', () => {
  it('should create a message with valid id', () => {
    const messages = new MessageInMemory();
    const nowTime = new Date();
    const message1 = messages.createMessage(1, 'hello', nowTime, undefined);
    const parentMessage = messages.getByID(message1);
    messages.createMessage(1, 'hello2', nowTime, parentMessage);
    const messagePagination = messages.getMessages(0, 2);
    const expected: Record<string, string | number>[] = [
      Object({
        author: 1,
        timestamp: nowTime.toISOString(),
        content: 'hello',
        messageID: 0,
      }),
      Object({
        author: 1,
        timestamp: nowTime.toISOString(),
        content: 'hello2',
        messageID: 1,
      }),
    ];
    expect(messagePagination == expected);
  });
});
