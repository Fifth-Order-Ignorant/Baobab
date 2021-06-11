import { UserProfileInMemory } from '../src/dao/userprofiles';

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';

describe('End to end profile editing tests', () => {
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

  it(`lets you get your profile`, async () => {
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

    return agent.get('/user/profile').send({}).expect(HttpStatus.OK);
  });

  it(`lets you change your name`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/user/editname')
      .send({
        firstName: 'ethan2',
        lastName: 'lam2',
      })
      .expect(HttpStatus.CREATED);
  });

  it(`changes your name correctly`, async (done) => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    const response = await agent.get('/user/profile').send({});

    expect(response.body[0]).toBe('ethan2');
    expect(response.body[1]).toBe('lam2');
    expect(response.body[2]).toBe('');
    expect(response.body[3]).toBe('');
    done();
  });

  it(`lets you change your job`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/user/editjob')
      .send({
        jobTitle: 'marketing vp',
      })
      .expect(HttpStatus.CREATED);
  });

  it(`changes your job correctly`, async (done) => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    const response = await agent.get('/user/profile').send({});

    expect(response.body[0]).toBe('ethan2');
    expect(response.body[1]).toBe('lam2');
    expect(response.body[2]).toBe('marketing vp');
    expect(response.body[3]).toBe('');
    done();
  });

  it(`lets you change your bio`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/user/editbio')
      .send({
        bio: 'haha!',
      })
      .expect(HttpStatus.CREATED);
  });

  it(`changes your bio correctly`, async (done) => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    const response = await agent.get('/user/profile').send({});

    expect(response.body[0]).toBe('ethan2');
    expect(response.body[1]).toBe('lam2');
    expect(response.body[2]).toBe('marketing vp');
    expect(response.body[3]).toBe('haha!');
    done();
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('User tests', () => {
  it('should create a user', () => {
    const users = new UserProfileInMemory();

    users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    expect(users.getUserProfileCount() == 1);
  });

  it('should return a valid user given id', () => {
    const users = new UserProfileInMemory();
    const userID = users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    const user = users.getUserByID(userID);
    expect(user.email == 'michael092001@gmail.com');
  });

  it('should return a valid profile given id', () => {
    const users = new UserProfileInMemory();
    const userID = users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    const profile = users.getProfileByID(userID);
    expect(profile.name == 'Michael Sheinman Orenstrakh');
  });
});
