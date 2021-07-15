import { TeamDAO } from 'src/dao/teams';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoDBDAOModule } from '../src/modules/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/modules/configuration';
import { Connection } from 'mongoose';
import { DEFAULT_DB_CONNECTION } from '@nestjs/mongoose/dist/mongoose.constants';

describe('MongoDB Team DAO Tests', () => {
  let moduleRef: TestingModule;
  let dao: TeamDAO;

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

    dao = moduleRef.get<TeamDAO>('TeamDAO');
  });

  it('lets you create a new team', async () => {
    const id = await dao.createTeam(0, new Date(), 'Sixth Order Ignorant');
    const team = await dao.getById(id);
    expect(team.id).toEqual(0);
  });

  it('notices that a team exists in the system', async () => {
    expect(dao.teamExists('Sixth Order Ignorant'));
  });

  it('gets a list of teams correctly', async () => {
    const teams = await dao.getTeams(0, 1);
    expect(teams.length).toEqual(1);
  });

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
