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

  stringToRole(roleString: string): Role {
    let role: Role;
    switch (roleString) {
      case 'default':
        role = Role.DEFAULT;
        break;
      case 'entrepreneur':
        role = Role.ENTREPRENEUR;
        break;
      case 'investor representative':
        role = Role.INVESTOR_REP;
        break;
      case 'service provider representative':
        role = Role.SERVICE_PROVIDER_REP;
        break;
      default:
        role = undefined;
        break;
    }
    return role;
  }
}
