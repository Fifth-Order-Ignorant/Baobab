import { UserProfileInMemory } from '../src/dao/memory/userprofiles.mem';

import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';
import { Role } from '../src/entities/role.entity';
import * as superagent from 'superagent';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { clean } from './clean';

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

    return agent.get('/profile/myprofile').send({}).expect(HttpStatus.OK);
  });

  it(`lets you change your name`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .patch('/profile/editname')
      .send({
        firstName: 'ethan2',
        lastName: 'lam2',
      })
      .expect(HttpStatus.OK);
  });

  it(`changes your name correctly`, async (done) => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    const response = await agent.get('/profile/myprofile').send({});

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
      .patch('/profile/editjob')
      .send({
        jobTitle: 'marketing vp',
      })
      .expect(HttpStatus.OK);
  });

  it(`changes your job correctly`, async (done) => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    const response = await agent.get('/profile/myprofile').send({});

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
      .patch('/profile/editbio')
      .send({
        bio: 'haha!',
      })
      .expect(HttpStatus.OK);
  });

  it(`changes your bio correctly`, async (done) => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    const response = await agent.get('/profile/myprofile').send({});

    expect(response.body[0]).toBe('ethan2');
    expect(response.body[1]).toBe('lam2');
    expect(response.body[2]).toBe('marketing vp');
    expect(response.body[3]).toBe('haha!');
    done();
  });

  it('Profile Picture Upload', async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    await agent
      .post('/profile/picture')
      .attach('picture', './test/pfp.png')
      .expect(HttpStatus.CREATED);

    const pfpDownload = await agent
      .get('/user/picture/0')
      .expect(HttpStatus.OK)
      .buffer(true)
      // eslint-disable-next-line import/namespace
      .parse(superagent.parse.image);

    const localChecksum = crypto
      .createHash('md5')
      .update(fs.readFileSync('./test/pfp.png'))
      .digest('hex');

    const downloadChecksum = crypto
      .createHash('md5')
      .update(pfpDownload.body)
      .digest('hex');

    expect(downloadChecksum).toEqual(localChecksum);
  });

  afterAll(async () => {
    await clean(app);
    await app.close();
  });
});

describe('End to end profile viewing tests', () => {
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

  it(`lets you get a profile without being logged in`, async () => {
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

    return agent
      .post('/user/view')
      .send({ userId: 0 })
      .expect(HttpStatus.CREATED);
  });

  it(`gives profile data correctly`, async (done) => {
    const agent = request.agent(app.getHttpServer());

    await agent
      .post('/user/register')
      .send({
        firstName: 'mar',
        lastName: 'yam',
        email: 'mar@mail.com',
        password: '123',
      })
      .expect(HttpStatus.CREATED);

    const response = await agent.post('/user/view').send({ userId: 1 });

    expect(response.body[0]).toBe('mar');
    expect(response.body[1]).toBe('yam');
    expect(response.body[2]).toBe('');
    expect(response.body[3]).toBe('');
    done();
  });

  afterAll(async () => {
    await clean(app);
    await app.close();
  });
});

describe('User tests', () => {
  it('should create a user', async () => {
    const users = new UserProfileInMemory();

    await users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    expect((await users.getUserProfileCount()) == 1);
  });

  it('should return a valid user given id', async () => {
    const users = new UserProfileInMemory();
    const userId = await users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    const user = await users.getUserById(userId);
    expect(user.email == 'michael092001@gmail.com');
  });

  it('should return a valid profile given id', async () => {
    const users = new UserProfileInMemory();
    const userId = await users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );
    const profile = await users.getProfileById(userId);
    expect(profile.name == 'Michael Sheinman Orenstrakh');
  });
});

describe('Profile Pagination Basic Functionality', () => {
  it('should return the paginated data in the right format', async () => {
    const users = new UserProfileInMemory();
    const userId = await users.addUserProfile(
      'Michael',
      'Sheinman Orenstrakh',
      'michael092001@gmail.com',
      '12345',
    );

    const profile1 = await users.getProfileById(userId);
    profile1.role = Role.INVESTOR_REP;
    profile1.bio = 'I love chihuahuas.';
    profile1.jobTitle = 'OP Programmer';
    const userId2 = await users.addUserProfile(
      'Michael',
      'Sheinman (Clone)',
      'michael092002@gmail.com',
      '12345',
    );
    const profiles = await users.getPaginatedProfiles(0, 2);

    expect(profiles).toEqual([
      Object({
        id: userId,
        bio: 'I love chihuahuas.',
        firstName: 'Michael',
        lastName: 'Sheinman Orenstrakh',
        jobTitle: 'OP Programmer',
        role: Role.INVESTOR_REP,
      }),
      Object({
        id: userId2,
        bio: '',
        firstName: 'Michael',
        lastName: 'Sheinman (Clone)',
        jobTitle: '',
        role: Role.DEFAULT,
      }),
    ]);
  });
});
