import { UserProfileDAO } from '../src/dao/userprofiles';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoDBDAOModule } from '../src/modules/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/modules/configuration';
import { FileInfo } from '../src/entities/fileinfo.entity';
import * as mime from 'mime';
import { Connection } from 'mongoose';
import { DEFAULT_DB_CONNECTION } from '@nestjs/mongoose/dist/mongoose.constants';

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

    const user = await dao.getUserById(id);
    const profile = await dao.getProfileById(id);

    expect(user.id).toEqual(0);
    expect(profile.id).toEqual(0);
  });

  it('Update Profile', async () => {
    const id = await dao.addUserProfile(
      'Murasaki',
      'Shion',
      'tamanegi@mail.moe',
      'garlic',
    );

    const oldProfile = await dao.getProfileById(id);

    oldProfile.firstName = 'Minato';
    oldProfile.lastName = 'Aqua';

    await dao.updateProfile(oldProfile);

    const newProfile = await dao.getProfileById(id);

    expect(newProfile.name).toEqual('Minato Aqua');
  });

  it('Profile Pagination', async () => {
    const [firstProfile] = await dao.getPaginatedProfiles(0, 1);

    expect(firstProfile.firstName + ' ' + firstProfile.lastName).toEqual(
      'Mio Akiyama',
    );

    const [secondProfile] = await dao.getPaginatedProfiles(1, 2);

    expect(secondProfile.firstName + ' ' + secondProfile.lastName).toEqual(
      'Minato Aqua',
    );
  });

  it('Profile Picture Update', async () => {
    const oldProfile = await dao.getProfileById(1);

    oldProfile.picture = new FileInfo(
      'akutan.jpg',
      mime.getType('jpg'),
      1024,
      'akutan',
    );

    await dao.updateProfile(oldProfile);

    const newProfile = await dao.getProfileById(1);

    expect(newProfile.picture.originalName).toEqual('akutan.jpg');
  });

  it('Email Query', async () => {
    const user = await dao.getUserByEmail('tamanegi@mail.moe');

    expect(user.password).toEqual('garlic');
  });

  // close mongoose connection to prevent Jest from hanging
  afterAll(async () => {
    const conn = moduleRef.get<Connection>(DEFAULT_DB_CONNECTION);
    if (conn) {
      const cols = await conn.db.collections();
      for (const col of cols) {
        await col.deleteMany({});
      }
    }
    await moduleRef.close();
  });
});
