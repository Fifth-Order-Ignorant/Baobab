import { PostInMemory } from '../src/dao/memory/posts.mem';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';

describe('Post Creation Tests', () => {
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

  it(`lets you create a post with no parent`, async () => {
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
      .post('/post/create')
      .send({
        content: 'hello1',
        parentID: -1,
      })
      .expect(HttpStatus.CREATED);
  });

  it(`lets you create a post with a parent`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/post/create')
      .send({
        content: 'hello2',
        parentID: 0,
      })
      .expect(HttpStatus.CREATED);
  });

  it(`doesn't let you create a post with a bad parent`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/post/create')
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

describe('Post Basic Functionality', () => {
  it('should create a post with valid id', async () => {
    const posts = new PostInMemory();

    const nowTime = new Date();
    const postId = await posts.createPost(1, 'hello', nowTime, undefined);
    expect((await posts.getByID(postId)).id == postId);
  });

  it('should return a post given an id', async () => {
    const posts = new PostInMemory();

    const nowTime = new Date();
    const postId = await posts.createPost(1, 'hello', nowTime, undefined);
    const post = await posts.getByID(postId);
    expect(post.parent == undefined);
  });

  it('lets you create a post with a parent', async () => {
    const posts = new PostInMemory();

    const nowTime = new Date();
    const post1 = await posts.createPost(1, 'hello', nowTime, undefined);
    const parentPost = await posts.getByID(post1);
    const post2 = await posts.createPost(1, 'hello2', nowTime, parentPost);
    const post = await posts.getByID(post2);
    expect(post.parent == parentPost);
  });
});

describe('Post Pagination Basic Functionality', () => {
  it('should return the parent posts paginated data in the right format', async () => {
    const posts = new PostInMemory();
    const nowTime = new Date();
    const post1 = await posts.createPost(1, 'hello', nowTime, undefined);
    const parentPost = await posts.getByID(post1);
    await posts.createPost(1, 'hello2', nowTime, parentPost);
    const postPagination = await posts.getParentPosts(0, 2);
    const expected: Record<string, string | number>[] = [
      Object({
        author: 1,
        timestamp: nowTime.toISOString(),
        content: 'hello',
        postId: 0,
      }),
    ];
    expect(postPagination).toEqual(expected);
  });

  it('should return the replies paginated data in the right format', async () => {
    const posts = new PostInMemory();
    const nowTime = new Date();
    const post1 = await posts.createPost(1, 'hello', nowTime, undefined);
    const parentPost = await posts.getByID(post1);
    await posts.createPost(1, 'hello2', nowTime, parentPost);
    const postPagination = await posts.getReplies(0, 0, 2);
    const expected: Record<string, string | number>[] = [
      Object({
        author: 1,
        timestamp: nowTime.toISOString(),
        content: 'hello2',
        postId: 1,
      }),
    ];
    expect(postPagination).toEqual(expected);
  });

  it('should return the paginated data in the right format', async () => {
    const posts = new PostInMemory();
    const nowTime = new Date();
    const post1 = await posts.createPost(1, 'hello', nowTime, undefined);
    const parentPost = await posts.getByID(post1);
    await posts.createPost(1, 'hello2', nowTime, parentPost);
    const postPagination = await posts.getRepliesOfUser(1, 0, 2);
    const expected: Record<string, string | number>[] = [
      Object({
        author: 1,
        timestamp: nowTime.toISOString(),
        content: 'hello2',
        postId: 1,
      }),
    ];
    expect(postPagination).toEqual(expected);
  });

  it('should return the paginated data of one user posts in the right format', async () => {
    const posts = new PostInMemory();
    const nowTime = new Date();
    const post1 = await posts.createPost(1, 'hello', nowTime, undefined);
    const parentPost = await posts.getByID(post1);
    await posts.createPost(1, 'hello2', nowTime, parentPost);
    const postPagination = await posts.getPostsOfUser(1, 0, 2);
    const expected: Record<string, string | number>[] = [
      Object({
        author: 1,
        timestamp: nowTime.toISOString(),
        content: 'hello',
        postId: 0,
      }),
    ];
    expect(postPagination).toEqual(expected);
  });
});
