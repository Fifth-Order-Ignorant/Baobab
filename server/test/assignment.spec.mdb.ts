import { AssignmentDAO } from 'src/dao/assignments';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoDBDAOModule } from '../src/modules/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/modules/configuration';

describe('MongoDB Assignment DAO Tests', () => {
  let moduleRef: TestingModule;
  let dao: AssignmentDAO;

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

    dao = moduleRef.get<AssignmentDAO>('AssignmentDAO');
  });

  it('Creates an assignment', async () => {
    const id = await dao.createAssignment(
      'Load Trips',
      'Shoutout to michael liut',
      100,
    );
    const assignment = await dao.getById(id);
    expect(assignment.name).toEqual("Load Trips");
  });

  afterAll(async () => {
    await moduleRef.close();
  });
});
