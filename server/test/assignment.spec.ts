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

describe('Assignment Create API Test', () => {
  let app: INestApplication;
  let userAgent: request.SuperAgentTest;
  let adminAgent: request.SuperAgentTest;
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

  it(`lets you create a new assignment`, async () => {
    return adminAgent
      .post('/assignment/create')
      .send({
        name: 'A1',
        description: 'hi',
        maxMark: 100,
      })
      .expect(HttpStatus.CREATED);
  });

  it(`lets you create a new assignment and gives the correct id`, async (done) => {
    const response = await adminAgent.post('/assignment/create').send({
      name: 'A2',
      description: 'poop',
      maxMark: 50,
    });
    expect(response.body.id).toBe(1);
    done();
  });

  it(`lets you view an assignment`, async () => {
    return await userAgent.get('/assignment/get/0').expect(HttpStatus.OK);
  });

  it(`lets you view an assignment and the given details are correct`, async (done) => {
    const response = await userAgent
      .get('/assignment/get/0')
      .expect(HttpStatus.OK);
    expect(response.body.name).toBe('A1');
    expect(response.body.description).toBe('hi');
    expect(response.body.maxMark).toBe(100);
    done();
  });

  it(`does not let you view an assignment that does not exist`, async () => {
    return await userAgent
      .get('/assignment/get/3')
      .expect(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await clean(app);
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

describe('Assignment Pagination Basic Functionality', () => {
  it('should return the paginated data in the right format', async () => {
    const assignmentDAO = new AssignmentInMemory();
    await assignmentDAO.createAssignment(
      'CSC209: A1 Simulated File system',
      'Hard',
      100,
    );

    await assignmentDAO.createAssignment(
      'CSC209: A2 Process stuff',
      'Easy but you will screw up',
      100,
    );

    const assignments = await assignmentDAO.getAssignments(0, 2);
    expect(assignments.length).toEqual(2);
  });
});
