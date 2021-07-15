import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RequestDAO } from '../dao/requests';
import { Request } from '../entities/request.entity';
import { RoleRequestResponse } from 'baobab-common';
import { RequestStatus } from '../entities/requeststatus.entity';

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

  async getRequests(
    start: number,
    end: number,
  ): Promise<RoleRequestResponse[]> {
    const requests: Request[] =
      await this._requestRepository.getPaginatedRequests(start, end);
    const ans: RoleRequestResponse[] = [];

    for (const request of requests) {
      ans.push({
        requestId: request.id,
        userId: request.userId,
        role: request.role as string,
        description: request.description,
      });
    }
    return ans;
  }

  async approveRequest(id: number): Promise<[number, string]> {
    const request: Request = await this._requestRepository.getById(id);
    request.status = RequestStatus.APPROVED;
    this._requestRepository.updateRequest(request);
    return [request.userId, request.role];
  }

  async rejectRequest(id: number): Promise<[number, string]> {
    const request: Request = await this._requestRepository.getById(id);
    request.status = RequestStatus.REJECTED;
    this._requestRepository.updateRequest(request);
    return [request.userId, request.role];
  }

  async isPendingRequest(id: number): Promise<boolean> {
    const request: Request = await this._requestRepository.getById(id);
    return request.status == RequestStatus.PENDING;
  }
}
