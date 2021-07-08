import { Injectable } from '@nestjs/common';
import { MulterDAO } from '../files';
import { GridFSBucket, ObjectId } from 'mongodb';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage/lib/gridfs';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(@InjectConnection() private _connection: Connection) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: new GridFsStorage({
        db: this._connection,
        file: (request, file) => {
          return {
            filename: file.id,
          };
        },
      }),
    };
  }
}

@Injectable()
export class MulterMongoDAO implements MulterDAO {
  private _gridFS: GridFSBucket;

  constructor(@InjectConnection() connection: Connection) {
    this._gridFS = new GridFSBucket(connection.db);
  }

  async deleteFile(storedName: string): Promise<void> {
    this._gridFS.delete(ObjectId.createFromHexString(storedName));
  }

  async getFile(storedName: string): Promise<NodeJS.ReadableStream> {
    return this._gridFS.openDownloadStreamByName(storedName);
  }
}
