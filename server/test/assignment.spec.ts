import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/modules/app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';
import * as cookieParser from 'cookie-parser';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import { AssignmentInMemory } from '../src/dao/memory/assignments.mem';
import { FileInfo } from '../src/entities/fileinfo.entity';
import { Connection } from 'mongoose';
import { DEFAULT_DB_CONNECTION } from '@nestjs/mongoose/dist/mongoose.constants';

describe('Assignment Create API Test', () => {
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

  it(`lets you create a new assignment`, async () => {
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

    return agent
      .post('/assignment/create')
      .send({
        name: 'A1',
        description: 'hi',
        maxMark: 100,
      })
      .expect(HttpStatus.CREATED);
  });

  it(`lets you create a new assignment and gives the correct id`, async (done) => {
    const agent = request.agent(app.getHttpServer());

    await agent
      .post('/auth/login')
      .send({
        email: 'ethan@mail.com',
        password: 'mcs',
      })
      .expect(HttpStatus.CREATED);

    const response = await agent.post('/assignment/create').send({
      name: 'A2',
      description: 'poop',
      maxMark: 50,
    });
    expect(response.body.id).toBe(1);
    done();
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

describe('Assignment Upload File API Tests', () => {
  it('should return the correct file info', async () => {
    const assignments = new AssignmentInMemory();

    const assignmentId = await assignments.createAssignment(
      'DATABASE DATABASE JUST MAKIN A DATABASE WO OH',
      'make a database',
      69420,
    );

    const file: FileInfo = new FileInfo(
      'chillin',
      'text/plain',
      64,
      'flameo hotman',
    );
    assignments.uploadFile(assignmentId, file);
    const file2: FileInfo = await assignments.getFile(assignmentId);
    return expect(file).toEqual(file2);
  });
});
