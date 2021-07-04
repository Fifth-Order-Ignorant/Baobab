import { Assignment } from '../entities/assignment.entity';
import { Inject, Injectable } from '@nestjs/common';
import { AssignmentDAO } from '../dao/assignments';
import { AssignmentResponse } from 'baobab-common';

@Injectable()
export class AssignmentService {
  constructor(
    @Inject('AssignmentDAO') private _assignmentRepository: AssignmentDAO,
  ) {}

  createAssignment(
    name: string,
    description: string,
    maxMark = -1,
  ): Assignment {
    return this._assignmentRepository.getById(
      this._assignmentRepository.createAssignment(name, description, maxMark),
    );
  }

  getPaginatedAssignments(start: number, end: number): AssignmentResponse[] {
    return this._assignmentRepository.getPaginatedAssignments(start, end);
  }
}
