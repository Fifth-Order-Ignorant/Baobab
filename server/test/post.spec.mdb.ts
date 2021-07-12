import { PostDAO } from '../src/dao/posts';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoDBDAOModule } from '../src/modules/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/modules/configuration';

describe('MongoDB User Profile DAO Tests', () => {
  let moduleRef: TestingModule;
  let dao: PostDAO;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        MongoDBDAOModule,
      ],
    }).compile();

    dao = moduleRef.get<PostDAO>('PostDAO');
  });

  it('Create a post', async () => {
    const timestamp = new Date();
    const id = await dao.createPost(0, 'Hello world!', timestamp, null);
    const post = await dao.getByID(id);
    expect(post.userId).toEqual(0);
    expect(post.content).toEqual('Hello world!');
    expect(post.timestamp).toEqual(timestamp);
  });

  it('Create a reply', async () => {
    const childId = await dao.createPost(
      0,
      'Goodbye world!',
      new Date(),
      await dao.getByID(0),
    );
    const childPost = await dao.getByID(childId);
    expect(childPost.parent.id).toEqual(0);
  });

  it('Fetch Children', async () => {
    const children = await dao.getChilds(0);
    expect(children[0].id).toEqual(1);
  });

  it('Paginate Original Posts', async () => {
    await dao.createPost(0, 'Akukin Kensetsu', new Date(), null);

    const [firstPost] = await dao.getParentPosts(0, 1);

    expect(firstPost.content).toEqual('Hello world!');

    const [secondPost] = await dao.getParentPosts(1, 2);

    expect(secondPost.content).toEqual('Akukin Kensetsu');
  });

  it('Paginate Replies', async () => {
    const parentId = await dao.createPost(0, '?', new Date(), null);
    await dao.createPost(1, '??', new Date(), await dao.getByID(parentId));
    await dao.createPost(1, '?!', new Date(), await dao.getByID(parentId));
    await dao.createPost(1, '?&', new Date(), await dao.getByID(parentId));

    const [firstPost] = await dao.getReplies(parentId, 0, 1);

    expect(firstPost.content).toEqual('??');

    const [secondPost] = await dao.getReplies(parentId, 1, 2);

    expect(secondPost.content).toEqual('?!');

    const posts = await dao.getReplies(parentId, 0, 3);

    expect(posts[2].content).toEqual('?&');
  });

  it("Paginate Users' Replies", async () => {
    const parentId = await dao.createPost(2, '!', new Date(), null);
    const parentId2 = await dao.createPost(3, '!', new Date(), null);
    await dao.createPost(2, '!!', new Date(), await dao.getByID(parentId));
    await dao.createPost(3, '!!!', new Date(), await dao.getByID(parentId2));
    await dao.createPost(3, '!!!!', new Date(), await dao.getByID(parentId));
    await dao.createPost(3, '!!!!!', new Date(), await dao.getByID(parentId2));

    const [firstPost] = await dao.getRepliesOfUser(2, 0, 1);

    expect(firstPost.content).toEqual('!!');

    const [secondPost] = await dao.getRepliesOfUser(3, 0, 1);

    expect(secondPost.content).toEqual('!!!');

    const posts = await dao.getRepliesOfUser(3, 0, 3);

    expect(posts[1].content).toEqual('!!!!');

    expect(posts[2].content).toEqual('!!!!!');
  });

  it("Paginate Users' Posts", async () => {
    await dao.createPost(4, 'hello', new Date(), null);
    const parentId = await dao.createPost(4, 'whoever is', new Date(), null);
    await dao.createPost(
      4,
      'reading this',
      new Date(),
      await dao.getByID(parentId),
    );
    await dao.createPost(4, 'yes this includes replies too', new Date(), null);
    const [firstPost] = await dao.getPostsOfUser(4, 0, 1);
    expect(firstPost.content).toEqual('hello');
    const [secondPost] = await dao.getPostsOfUser(4, 1, 2);
    expect(secondPost.content).toEqual('whoever is');
    const posts = await dao.getPostsOfUser(4, 0, 4);
    expect(posts[2].content).toEqual('reading this');
    expect(posts[3].content).toEqual('yes this includes replies too');
  });

  // close mongoose connection to prevent Jest from hanging
  afterAll(async () => {
    await moduleRef.close();
  });
});
