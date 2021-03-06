import { RequestDAO } from '../src/dao/requests';
import { Role } from '../src/entities/role.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoDBDAOModule } from '../src/modules/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/modules/configuration';
import { Connection } from 'mongoose';
import { DEFAULT_DB_CONNECTION } from '@nestjs/mongoose/dist/mongoose.constants';

describe('MongoDB Request DAO Tests', () => {
  let moduleRef: TestingModule;
  let requestDao: RequestDAO;

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

    requestDao = moduleRef.get<RequestDAO>('RequestDAO');
  });
  it('Create Request', async () => {
    const userId = 0;
    const currentDate: Date = new Date();
    const description = 'Can i have mod??';
    const role: Role = Role.INVESTOR_REP;
    const id = await requestDao.createRequest(
      userId,
      description,
      currentDate,
      role,
    );
    const request = await requestDao.getById(id);
    expect(request.id).toEqual(id);
    expect(request.userId).toEqual(userId);
    expect(request.timestamp).toEqual(currentDate);
    expect(request.description).toEqual(description);
    expect(request.role).toEqual(role);
  });
  it('Create multiple requests', async () => {
    const req1Id = await requestDao.createRequest(
      0,
      '0',
      new Date(),
      Role.ENTREPRENEUR,
    );
    const req2Id = await requestDao.createRequest(
      123,
      'abc',
      new Date(),
      Role.DEFAULT,
    );
    let request = await requestDao.getById(req1Id);
    expect(request.id).toEqual(req1Id);
    request = await requestDao.getById(req2Id);
    expect(request.id).toEqual(req2Id);
  });
  it('Paginate multiple requests', async () => {
    const requests = await requestDao.getPaginatedRequests(0, 200);
    expect(requests[0].id).toEqual(0);
    expect(requests[1].id).toEqual(1);
    expect(requests[2].id).toEqual(2);
  });
  it('Paginate one request', async () => {
    const requests = await requestDao.getPaginatedRequests(0, 1);
    expect(requests[0].id).toEqual(0);
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
