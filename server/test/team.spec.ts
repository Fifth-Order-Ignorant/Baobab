import { TeamInMemory } from '../src/dao/memory/teams.mem';
import { UserProfileInMemory } from '../src/dao/memory/userprofiles.mem';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/modules/app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';
import * as cookieParser from 'cookie-parser';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import { clean } from './clean';

describe('Team Create API Test', () => {
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

  it(`lets you create a new team`, async () => {
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
      .post('/team/create')
      .send({
        teamName: 'xi Order Ignorant',
      })
      .expect(HttpStatus.CREATED);
  });

  afterAll(async () => {
    await clean(app);
    await app.close();
  });
});

describe('Team Creation Test', () => {
  it('should create a post with valid id', async () => {
    const teams = new TeamInMemory();
    const nowTime = new Date();
    const users = new UserProfileInMemory();
    const userId = await users.addUserProfile(
      'Michael',
      'Sheinman',
      'michael092001@gmail.com',
      '1234',
    );

    const teamId = teams.createTeam(userId, nowTime, 'FIF');
    expect((await teams.getById(await teamId)).id == (await teamId));
  });
});
