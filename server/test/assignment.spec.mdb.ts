import { AssignmentDAO } from '../src/dao/assignments';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoDBDAOModule } from '../src/modules/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/modules/configuration';
import { FileInfo } from '../src/entities/fileinfo.entity';
import { Connection } from 'mongoose';
import { DEFAULT_DB_CONNECTION } from '@nestjs/mongoose/dist/mongoose.constants';

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
    expect(assignment.name).toEqual('Load Trips');
  });

  it('should return the correct file info', async () => {
    const assignmentId = await dao.createAssignment(
      'DATABASE DATABASE JUST MAKIN A DATABASE WO OH',
      'make a database',
      69420,
    );

    const file: FileInfo = new FileInfo(
      'chillin',
      'text/plain',
      64,
      'flameo hotman',
    );
    await dao.uploadFile(assignmentId, file);
    const file2: FileInfo = await dao.getFile(assignmentId);
    return expect(file2.originalName).toEqual(file.originalName);
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
