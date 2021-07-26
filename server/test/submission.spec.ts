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
import { UserProfileDAO } from '../src/dao/userprofiles';
import { Role } from '../src/entities/role.entity';

/**
 * Returns a SuperAgentTest for testing
 * @param app Nest application
 * @param firstName first name of user
 * @param lastName last name of user
 * @param email email of user
 * @param password password of user
 * @returns agent for testing
 */
async function getUserAgent(
  app: INestApplication,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<request.SuperAgentTest> {
  const agent = request.agent(app.getHttpServer());
  await agent.post('/user/register').send({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  await agent.post('/auth/login').send({
    email: email,
    password: password,
  });
  return agent;
}

async function getMentorAgent(
  app: INestApplication,
  userProfileDAO: UserProfileDAO,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<request.SuperAgentTest> {
  const agent = request.agent(app.getHttpServer());
  await agent.post('/user/register').send({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  await agent.post('/auth/login').send({
    email: email,
    password: password,
  });
  await agent.post('/auth/logout');
  const { id } = await userProfileDAO.getUserByEmail(email);
  const profile = await userProfileDAO.getProfileById(id);
  profile.role = Role.MENTOR;
  await userProfileDAO.updateProfile(profile);
  await agent.post('/auth/login').send({
    email: email,
    password: password,
  });
  return agent;
}

describe('Get Submission API Test', () => {
  let app: INestApplication;
  let agent: request.SuperAgentTest;
  let agent2: request.SuperAgentTest;
  let agent3: request.SuperAgentTest;
  let agent4: request.SuperAgentTest;
  let userProfileDAO: UserProfileDAO;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    const { httpAdapter } = app.get(HttpAdapterHost);
    userProfileDAO = moduleRef.get<UserProfileDAO>('UserProfileDAO');
    app.useGlobalFilters(new CustomExceptionsFilter(httpAdapter));
    app.useGlobalPipes(new YupValidationPipe());
    app.use(cookieParser());
    await app.init();

    agent = await getUserAgent(
      app,
      'rich',
      'tree',
      'rich@tree.com',
      'richtree',
    );
    agent2 = await getUserAgent(
      app,
      'ethan',
      'lam',
      'ethan.lam@mail.com',
      'mcs',
    );
    agent3 = await getUserAgent(
      app,
      'cool',
      'dude',
      'cool.dude@mail.utoronto.ca',
      'utm',
    );
    agent4 = await getMentorAgent(
      app,
      userProfileDAO,
      'mentoring',
      'TAPerson',
      'i.teach.people@u.of.t',
      'c01',
    );
  });

  it(`lets you create a submission`, async () => {
    await agent
      .post('/assignment/create')
      .send({
        name: 'A1',
        description: 'hi',
        maxMark: 100,
      })
      .expect(HttpStatus.CREATED);

    await agent
      .post('/assignment/create')
      .send({
        name: 'A2',
        description: 'hello',
        maxMark: 1,
      })
      .expect(HttpStatus.CREATED);

    await agent
      .put('/submission/create')
      .send({
        userId: 0,
        assignmentId: 0,
      })
      .expect(HttpStatus.OK);

    // Duplicate submissions should not error out.
    await agent
      .put('/submission/create')
      .send({
        userId: 0,
        assignmentId: 0,
      })
      .expect(HttpStatus.OK);

    // create a few more assignments
    await agent
      .put('/submission/create')
      .send({
        userId: 0,
        assignmentId: 1,
      })
      .expect(HttpStatus.OK);

    await agent2
      .put('/submission/create')
      .send({
        userId: 1,
        assignmentId: 1,
      })
      .expect(HttpStatus.OK);

    await agent3
      .put('/submission/create')
      .send({
        userId: 2,
        assignmentId: 1,
      })
      .expect(HttpStatus.OK);

    await agent3
      .put('/submission/create')
      .send({
        userId: 2,
        assignmentId: 0,
      })
      .expect(HttpStatus.OK);

    return await agent
      .post('/submission/fileup/0')
      .attach('fileup', './test/pfp.png')
      .expect(HttpStatus.CREATED);
  });

  describe('Paginate submissions', () => {
    // TODO: Fix (0, 0) testcase (see yup docs)
    // it('Paginate empty', async () => {
    //   const assignments = (
    //     await agent4
    //       .get('/submission/pagination/0?start=0&end=0')
    //       .expect(HttpStatus.OK)
    //   ).body;
    //   expect(assignments.length).toEqual(0);
    // });
    it('Paginate with contents', async () => {
      const assignments = (
        await agent4
          .get('/submission/pagination/0?start=0&end=2')
          .expect(HttpStatus.OK)
      ).body;
      const assignments2 = (
        await agent4
          .get('/submission/pagination/1?start=0&end=4')
          .expect(HttpStatus.OK)
      ).body;
      expect(assignments.data.length).toEqual(2);
      expect(assignments2.data.length).toEqual(3);
    });
    it('Prevent pagination as a non-mentor', async () => {
      await agent
        .get('/submission/pagination/0?start=0&end=2')
        .expect(403);
    });
    it('Count pages of an assignment', async () => {
      const assignments = (
        await agent4
          .get('/submission/pagination/1?start=0&end=2')
          .expect(HttpStatus.OK)
      ).body;
      expect(assignments.total).toEqual(3);
    });
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
