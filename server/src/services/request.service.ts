import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RequestDAO } from '../dao/requests';
import { Request } from '../entities/request.entity';

@Injectable()
export class RequestService {
  constructor(@Inject('RequestDAO') private _requestRepository: RequestDAO) {}

  createRequest(
    userID: number,
    description: string,
    timestamp: Date,
    role: Role,
  ): Request {
    return this._requestRepository.getById(
      this._requestRepository.createRequest(
        userID,
        description,
        timestamp,
        role,
      ),
    );
  }
}
