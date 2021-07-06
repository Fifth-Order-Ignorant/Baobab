import { Role } from '../entities/role.entity';

export interface RequestDAO {
  createRequest(
    userId: number,
    description: string,
    timestamp: Date,
    role: Role,
  ): number;
  getById(id: number);
}
