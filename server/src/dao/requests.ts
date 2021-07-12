import { Injectable } from '@nestjs/common';
import { Request } from '../entities/request.entity';
import { Role } from '../entities/role.entity';

export interface RequestDAO {
  createRequest(
    userId: number,
    description: string,
    timestamp: Date,
    role: Role,
  ): Promise<number>;
  getById(id: number): Promise<Request>;
  getPaginatedRequests(start: number, end: number): Promise<Request[]>;
}
