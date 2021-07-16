import { RequestDAO } from '../requests';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from '../../entities/request.entity';
import { Role } from '../../entities/role.entity';
import { Model } from 'mongoose';
import { RequestStatus } from '../../entities/requeststatus.entity';

export class RequestMongoDAO implements RequestDAO {
  constructor(@InjectModel(Request.name) private _requests: Model<Request>) {}

  async createRequest(
    userId: number,
    description: string,
    timestamp: Date,
    role: Role,
  ): Promise<number> {
    const id = await this._requests.countDocuments();
    await this._requests.create(
      new Request(id, userId, timestamp, description, role),
    );
    return id;
  }

  async getById(id: number): Promise<Request> {
    return await this._requests.findById(id);
  }

  async getPaginatedRequests(start: number, end: number): Promise<Request[]> {
    return this._requests
      .find(this._requests.translateAliases({ status: RequestStatus.PENDING }))
      .sort(this._requests.translateAliases({ id: 'asc' }))
      .skip(start)
      .limit(end - start);
  }

  async updateRequest(request: Request): Promise<Request> {
    return this._requests.findByIdAndUpdate(request.id, request, {
      new: true,
    });
  }
}
