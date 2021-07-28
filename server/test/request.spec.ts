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
import { clean } from './clean';

describe('Role Request Tests', () => {
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

  it(`lets you request a role`, async () => {
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
      .post('/request/role')
      .send({
        description: 'i want role',
        role: 'Entrepreneur',
      })
      .expect(HttpStatus.CREATED);
  });

  it(`doesn't let you request a bad role`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/request/role')
      .send({
        description: 'i want role',
        role: 'investorr representative',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it(`lets you approve a role change`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .patch('/request/approve')
      .send({
        requestId: 0,
        isApproved: true,
      })
      .expect(HttpStatus.OK);
  });

  it(`changes the role correctly`, async (done) => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    const response = await agent.get('/profile/myprofile').send({});

    expect(response.body[0]).toBe('ethan');
    expect(response.body[1]).toBe('lam');
    expect(response.body[2]).toBe('');
    expect(response.body[3]).toBe('');
    expect(response.body[4]).toBe('Entrepreneur');
    done();
  });

  it(`lets you reject a role change`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    await agent
      .post('/request/role')
      .send({
        description: 'i want roleeeee',
        role: 'Investor Representative',
      })
      .expect(HttpStatus.CREATED);

    return agent
      .patch('/request/approve')
      .send({
        requestId: 1,
        isApproved: false,
      })
      .expect(HttpStatus.OK);
  });

  it(`keeps the role the same after rejection`, async (done) => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    const response = await agent.get('/profile/myprofile').send({});

    expect(response.body[0]).toBe('ethan');
    expect(response.body[1]).toBe('lam');
    expect(response.body[2]).toBe('');
    expect(response.body[3]).toBe('');
    expect(response.body[4]).toBe('Entrepreneur');
    done();
  });

  it(`does not let you approve or reject a request that is not pending`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .patch('/request/approve')
      .send({
        requestId: 1,
        isApproved: false,
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('users who are not admins cannot access requests', async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
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
