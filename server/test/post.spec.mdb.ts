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
    expect(post.userID).toEqual(0);
    expect(post.content).toEqual('Hello world!');
    expect(post.timestamp).toEqual(timestamp);
  });

  it('Create a reply', async () => {
    const parentId = await dao.createPost(0, 'Hello world!', new Date(), null);
    const childId = await dao.createPost(0, 'Goodbye world!', new Date(), await dao.getByID(parentId));
    const childPost = await dao.getByID(childId);
    expect(childPost.parent).toEqual(await dao.getByID(parentId));
  });

  // close mongoose connection to prevent Jest from hanging
  afterAll(async () => {
    await moduleRef.close();
  });
});
