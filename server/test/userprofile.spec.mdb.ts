import { UserProfileDAO } from '../src/dao/userprofiles';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoDBDAOModule } from '../src/modules/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/modules/configuration';

describe('MongoDB User Profile DAO Tests', () => {
  let moduleRef: TestingModule;
  let dao: UserProfileDAO;

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

    dao = moduleRef.get<UserProfileDAO>('UserProfileDAO');
  });

  it('Add User', async () => {
    const id = await dao.addUserProfile(
      'Mio',
      'Akiyama',
      'mio@akym.moe',
      '12345',
    );

    const user = await dao.getUserByID(id);
    const profile = await dao.getProfileByID(id);

    expect(user.id).toEqual(0);
    expect(profile.id).toEqual(0);
  });

  // close mongoose connection to prevent Jest from hanging
  afterAll(async () => {
    await moduleRef.close();
  });
});
