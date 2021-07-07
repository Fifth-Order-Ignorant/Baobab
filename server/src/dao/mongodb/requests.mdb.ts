import { RequestDAO } from '../request';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from '../../entities/request.entity';
import { Role } from '../../entities/role.entity';
import { Model } from 'mongoose';

export class RequestMongoDAO implements RequestDAO {

  constructor(
    @InjectModel(Request.name) private _requests: Model<Request>
  ) {
  }

  async createRequest(
    userId: number,
    description: string,
    timestamp: Date,
    role: Role,
  ): Promise<number> {
    const id = await this._requests.countDocuments();
    await this._requests.create(new Request(id, userId, timestamp, description, role));
    return id;
  }

  async getById(
    id: number
  ): Promise<Request>{
    return await this._requests
    .findById(id);
  }
}
