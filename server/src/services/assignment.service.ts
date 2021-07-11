import { Assignment } from '../entities/assignment.entity';
import { Inject, Injectable } from '@nestjs/common';
import { AssignmentDAO } from '../dao/assignments';

@Injectable()
export class AssignmentService {
  constructor(
    @Inject('AssignmentDAO') private _assignmentRepository: AssignmentDAO,
  ) {}

  async createAssignment(
    name: string,
    description: string,
    maxMark = -1,
  ): Promise<Assignment> {
    return await this._assignmentRepository.getById(
      await this._assignmentRepository.createAssignment(name, description, maxMark),
    );
  }
}
