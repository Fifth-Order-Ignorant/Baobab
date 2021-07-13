import { MulterDAO } from '../files';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

@Injectable()
export class MulterLocalDAO implements MulterDAO {
  async deleteFile(storedName: string): Promise<void> {
    return fs.promises.unlink(path.join(os.tmpdir(), storedName));
  }

  async getFile(storedName: string): Promise<NodeJS.ReadableStream> {
    return fs.createReadStream(path.join(os.tmpdir(), storedName));
  }
}
