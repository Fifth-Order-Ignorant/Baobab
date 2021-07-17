import { Injectable } from '@nestjs/common';
import { RequestStatus } from '../../entities/requeststatus.entity';
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

  public async getPaginatedRequests(
    start: number,
    end: number,
  ): Promise<Request[]> {
    const requests: Request[] = this.requests;
    const n: number = requests.length;
    const lst: Request[] = [];
    let count = start;
    while (count < end && count < n) {
      const request: Request = requests[count];
      if (request.status == RequestStatus.PENDING) {
        lst.push(request);
      }
      count++;
    }
    return lst;
  }

  async updateRequest(request: Request): Promise<Request> {
    for (let i = 0; i < this.requests.length; i++) {
      if (this.requests[i].id === request.id) {
        this.requests[i] = request;
        return this.requests[i];
      }
    }
  }
}
