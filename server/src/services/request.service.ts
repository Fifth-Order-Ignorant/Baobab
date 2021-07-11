import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RequestDAO } from '../dao/requests';
import { Request } from '../entities/request.entity';

@Injectable()
export class RequestService {
  constructor(@Inject('RequestDAO') private _requestRepository: RequestDAO) {}

  async createRequest(
    userID: number,
    description: string,
    timestamp: Date,
    role: Role,
  ): Promise<Request> {
    return await this._requestRepository.getById(
      await this._requestRepository.createRequest(
        userID,
        description,
        timestamp,
        role,
      ),
    );
  }
}
