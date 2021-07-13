import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RequestDAO } from '../dao/requests';
import { Request } from '../entities/request.entity';

@Injectable()
export class RequestService {
  constructor(@Inject('RequestDAO') private _requestRepository: RequestDAO) {}

  async createRequest(
    userId: number,
    description: string,
    timestamp: Date,
    role: Role,
  ): Promise<Request> {
    return await this._requestRepository.getById(
      await this._requestRepository.createRequest(
        userId,
        description,
        timestamp,
        role,
      ),
    );
  }

  async getRequests(start: number, end: number): Promise<Request[]> {
    return this._requestRepository.getPaginatedRequests(start, end);
  }
}
