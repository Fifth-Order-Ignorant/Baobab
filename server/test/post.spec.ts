import { PostInMemory } from '../src/dao/memory/posts.mem';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { YupValidationPipe } from '../src/controllers/yup.pipe';
import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomExceptionsFilter } from '../src/controllers/unauthorized.filter';
import { Post } from '../src/entities/post.entity';
import { Tag } from '../src/entities/tag.entity';

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
        parentId: -1,
        tags: [],
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
        parentId: 0,
        tags: [],
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
        parentId: 3,
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it(`lets you create a post with one tag`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/post/create')
      .send({
        content: 'hello2',
        parentId: 0,
        tags: ['Fun'],
      })
      .expect(HttpStatus.CREATED);
  });

  it(`lets you create a post with three tags`, async () => {
    const agent = request.agent(app.getHttpServer());

    await agent.post('/auth/login').send({
      email: 'ethan@mail.com',
      password: 'mcs',
    });

    return agent
      .post('/post/create')
      .send({
        content: 'hello2',
        parentId: 0,
        tags: ['Fun', 'Technology', 'Business'],
      })
      .expect(HttpStatus.CREATED);
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('Post Basic Functionality', () => {
  it('should create a post with valid id', async () => {
    const posts = new PostInMemory();

    const nowTime = new Date();
    const postId = await posts.createPost(1, 'hello', nowTime, undefined, []);
    expect((await posts.getById(postId)).id == postId);
  });

  it('should return a post given an id', async () => {
    const posts = new PostInMemory();

    const nowTime = new Date();
    const postId = await posts.createPost(1, 'hello', nowTime, undefined, []);
    const post = await posts.getById(postId);
    expect(post.parent == undefined);
  });

  it('lets you create a post with a parent', async () => {
    const posts = new PostInMemory();

    const nowTime = new Date();
    const post1 = await posts.createPost(1, 'hello', nowTime, undefined, []);
    const parentPost = await posts.getById(post1);
    const post2 = await posts.createPost(1, 'hello2', nowTime, parentPost, []);
    const post = await posts.getById(post2);
    expect(post.parent == parentPost);
  });

  it('lets you create a post with one tag', async () => {
    const posts = new PostInMemory();

    const nowTime = new Date();
    const postId = await posts.createPost(1, 'hello', nowTime, undefined, [
      Tag.FUN,
    ]);
    const post = await posts.getById(postId);
    const expected: string[] = ['Fun'];
    expect(post.tags).toEqual(expected);
  });

  it('lets you create a post with three tags', async () => {
    const posts = new PostInMemory();

    const nowTime = new Date();
    const postId = await posts.createPost(1, 'hello', nowTime, undefined, [
      Tag.FUN,
      Tag.BUSINESS,
      Tag.TECH,
    ]);
    const post = await posts.getById(postId);
    const expected: string[] = ['Fun', 'Business', 'Technology'];
    expect(post.tags).toEqual(expected);
  });
});

describe('Post Pagination Basic Functionality', () => {
  it('should return the parent posts paginated data in the right format', async () => {
    const posts = new PostInMemory();
    const nowTime = new Date();
    const post1 = await posts.createPost(1, 'hello', nowTime, undefined, []);
    const parentPost = await posts.getById(post1);
    await posts.createPost(1, 'hello2', nowTime, parentPost, []);
    const postPagination = await posts.getParentPosts(0, 2);
    const expected: Post[] = [new Post(0, 1, 'hello', nowTime, undefined, [])];
    expect(postPagination).toEqual(expected);
  });

  it('should return the replies paginated data in the right format', async () => {
    const posts = new PostInMemory();
    const nowTime = new Date();
    const post1 = await posts.createPost(1, 'hello', nowTime, undefined, []);
    const parentPost = await posts.getById(post1);
    await posts.createPost(1, 'hello2', nowTime, parentPost, []);
    const postPagination = await posts.getReplies(0, 0, 2);
    const expected: Post[] = [
      new Post(1, 1, 'hello2', nowTime, parentPost, []),
    ];
    expect(postPagination).toEqual(expected);
  });

  it('should return the paginated data in the right format', async () => {
    const posts = new PostInMemory();
    const nowTime = new Date();
    const post1 = await posts.createPost(1, 'hello', nowTime, undefined, []);
    const parentPost = await posts.getById(post1);
    await posts.createPost(1, 'hello2', nowTime, parentPost, []);
    const postPagination = await posts.getRepliesOfUser(1, 0, 2);
    const expected: Post[] = [
      new Post(1, 1, 'hello2', nowTime, parentPost, []),
    ];
    expect(postPagination).toEqual(expected);
  });

  it('should return the paginated data of one user posts in the right format', async () => {
    const posts = new PostInMemory();
    const nowTime = new Date();
    const post1 = await posts.createPost(1, 'hello', nowTime, undefined, []);
    const parentPost = await posts.getById(post1);
    await posts.createPost(1, 'hello2', nowTime, parentPost, []);
    const postPagination = await posts.getPostsOfUser(1, 0, 2);
    const expected: Post[] = [new Post(0, 1, 'hello', nowTime, undefined, [])];
    expect(postPagination).toEqual(expected);
  });
});
