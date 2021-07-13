import { Injectable } from '@nestjs/common';
import { Request } from '../../entities/request.entity';
import { Role } from '../../entities/role.entity';
import { RequestDAO } from '../requests';

@Injectable()
export class RequestInMemory implements RequestDAO {
  requests: Request[];
  highestId: number;
  requestCount: number;

  public constructor() {
    this.requests = [];
    this.highestId = 0;
    this.requestCount = 0;
  }

  public async createRequest(
    userId: number,
    description: string,
    timestamp: Date,
    role: Role,
  ): Promise<number> {
    const request = new Request(
      this.highestId,
      userId,
      timestamp,
      description,
      role,
    );
    this.requests.push(request);
    this.highestId++;
    return this.highestId - 1;
  }

  public async getById(id: number): Promise<Request> {
    let request: Request;
    this.requests.forEach((element) => {
      if (element.id == id) {
        request = element;
      }
    });
    return request;
  }
}
