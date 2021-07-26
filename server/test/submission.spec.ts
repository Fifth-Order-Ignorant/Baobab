import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/modules/app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';
import * as cookieParser from 'cookie-parser';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import { Connection } from 'mongoose';
import { DEFAULT_DB_CONNECTION } from '@nestjs/mongoose/dist/mongoose.constants';

describe('Get Submission API Test', () => {
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

  // TODO: this test needs to be updated once the endpoint to make a submission exists
  it(`lets you create a submission`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent
      .post('/user/register')
      .send({
        firstName: 'ethan',
        lastName: 'lam',
        email: 'ethan@mail.com',
        password: 'mcs',
      })
      .expect(HttpStatus.CREATED);

    await agent
      .post('/auth/login')
      .send({
        email: 'ethan@mail.com',
        password: 'mcs',
      })
      .expect(HttpStatus.CREATED);

    await agent
      .post('/assignment/create')
      .send({
        name: 'A1',
        description: 'hi',
        maxMark: 100,
      })
      .expect(HttpStatus.CREATED);

    await agent
      .put('/submission/create')
      .send({
        assignmentId: 0,
      })
      .expect(HttpStatus.OK);

    // Duplicate submissions should not error out.
    await agent
      .put('/submission/create')
      .send({
        assignmentId: 0,
      })
      .expect(HttpStatus.OK);

    return await agent
      .post('/submission/fileup/0')
      .attach('fileup', './test/pfp.png')
      .expect(HttpStatus.CREATED);
  });

  afterAll(async () => {
    const conn = app.get<Connection>(DEFAULT_DB_CONNECTION);
    if (conn) {
      const cols = await conn.db.collections();
      for (const col of cols) {
        await col.deleteMany({});
      }
    }
    await app.close();
  });
});
