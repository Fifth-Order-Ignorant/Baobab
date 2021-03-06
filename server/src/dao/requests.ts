import { Role } from '../entities/role.entity';
import { Request } from '../entities/request.entity';

export interface RequestDAO {
  createRequest(
    userId: number,
    description: string,
    timestamp: Date,
    role: Role,
  ): Promise<number>;
  getById(id: number): Promise<Request>;
  getPaginatedRequests(start: number, end: number): Promise<Request[]>;
  updateRequest(request: Request): Promise<Request>;
}
