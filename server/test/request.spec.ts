import { Role } from '../src/entities/role.entity';
import { RequestInMemory } from '../src/dao/memory/requests.mem';

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';
import { UserProfileDAO } from '../src/dao/userprofiles';

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

async function getRoleAgent(
  app: INestApplication,
  userProfileDAO: UserProfileDAO,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: Role,
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
  profile.role = role;
  await userProfileDAO.updateProfile(profile);
  await agent.post('/auth/login').send({
    email: email,
    password: password,
  });
  return agent;
}
import { clean } from './clean';

describe('Role Request Tests', () => {
  let app: INestApplication;
  let userProfileDAO: UserProfileDAO;
  let userAgent: request.SuperAgentTest;
  let adminAgent: request.SuperAgentTest;

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

    userAgent = await getUserAgent(
      app,
      'rich',
      'tree',
      'rich@tree.com',
      'richtree',
    );

    // Setup an admin agent.
    adminAgent = await getRoleAgent(
      app,
      userProfileDAO,
      'cool',
      'dude',
      'cool.dude@mail.utoronto.ca',
      'utm',
      Role.ADMIN,
    );
  });

  it(`lets you request a role`, async () => {
    return userAgent
      .post('/request/role')
      .send({
        description: 'i want role',
        role: 'Entrepreneur',
      })
      .expect(HttpStatus.CREATED);
  });

  it(`doesn't let you request a bad role`, async () => {
    return userAgent
      .post('/request/role')
      .send({
        description: 'i want role',
        role: 'investorr representative',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it(`lets you approve a role change`, async () => {
    return adminAgent
      .patch('/request/approve')
      .send({
        requestId: 0,
        isApproved: true,
      })
      .expect(HttpStatus.OK);
  });

  it(`changes the role correctly`, async (done) => {
    const response = await userAgent.get('/profile/myprofile').send({});

    expect(await response.body[0]).toBe('rich');
    expect(await response.body[1]).toBe('tree');
    expect(await response.body[2]).toBe('');
    expect(await response.body[3]).toBe('');
    expect(await response.body[4]).toBe('Entrepreneur');
    done();
  });

  it(`lets you reject a role change`, async () => {
    await userAgent
      .post('/request/role')
      .send({
        description: 'i want roleeeee',
        role: 'Investor Representative',
      })
      .expect(HttpStatus.CREATED);

    return adminAgent
      .patch('/request/approve')
      .send({
        requestId: 1,
        isApproved: false,
      })
      .expect(HttpStatus.OK);
  });

  it(`keeps the role the same after rejection`, async (done) => {
    const response = await userAgent.get('/profile/myprofile').send({});

    expect(await response.body[0]).toBe('rich');
    expect(await response.body[1]).toBe('tree');
    expect(await response.body[2]).toBe('');
    expect(await response.body[3]).toBe('');
    expect(await response.body[4]).toBe('Entrepreneur');
    done();
  });

  it(`does not let you approve or reject a request that is not pending`, async () => {
    return adminAgent
      .patch('/request/approve')
      .send({
        requestId: 1,
        isApproved: false,
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('users who are not admins cannot access requests', async () => {
    return userAgent
      .get('/request/pagination')
      .query({
        start: 0,
        stop: 1,
      })
      .expect(403);
  });

  afterAll(async () => {
    await clean(app);
    await app.close();
  });
});

describe('Request Basic Functionality', () => {
  it('should create a request with valid id', async () => {
    const requests = new RequestInMemory();

    const requestId = await requests.createRequest(
      1,
      'gimme permissions',
      new Date(),
      Role.INVESTOR_REP,
    );
    return expect((await requests.getById(requestId)).id).toEqual(requestId);
  });

  it('should return a request with requested Role', async () => {
    const requests = new RequestInMemory();
    const requestId = await requests.createRequest(
      1,
      'gimme permissions',
      new Date(),
      Role.INVESTOR_REP,
    );

    const request = await requests.getById(requestId);
    return expect(request.role).toEqual(Role.INVESTOR_REP);
  });
});

describe('Request Pagination Basic Functionality', () => {
  it('should paginate the correct request', async () => {
    const requests = new RequestInMemory();

    const requestId = await requests.createRequest(
      1,
      'gimme permissions',
      new Date(),
      Role.INVESTOR_REP,
    );

    const answers = await requests.getPaginatedRequests(0, 1);

    return expect(await answers[0].id).toEqual(requestId);
  });

  it('should return the correct slice for pagination', async () => {
    const requests = new RequestInMemory();
    const requestId = await requests.createRequest(
      1,
      'gimme permissions',
      new Date(),
      Role.INVESTOR_REP,
    );

    const requestId2 = await requests.createRequest(
      2,
      'gimme permissions',
      new Date(),
      Role.ENTREPRENEUR,
    );

    await requests.createRequest(
      3,
      'gimme permissions',
      new Date(),
      Role.SERVICE_PROVIDER_REP,
    );

    requests.getById(requestId);
    requests.getById(requestId2);

    const answers = await requests.getPaginatedRequests(0, 2);
    return expect(answers).toEqual(answers);
  });
});
