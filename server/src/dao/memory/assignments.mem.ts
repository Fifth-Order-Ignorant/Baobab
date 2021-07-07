import { Injectable } from '@nestjs/common';
import { Assignment } from '../../entities/assignment.entity';
import { AssignmentDAO } from '../assignments';

@Injectable()
export class AssignmentInMemory implements AssignmentDAO {
  assignments: Assignment[];
  highestID: number;
  assignmentCount: number;

  public constructor() {
    this.assignments = [];
    this.highestID = 0;
    this.assignmentCount = 0;
  }

  public createAssignment(
    name: string,
    description: string,
    maxMark: number,
  ): number {
    const assignment = new Assignment(
      this.highestID,
      name,
      description,
      maxMark,
    );
    this.assignments.push(assignment);
    this.highestID++;
    return this.highestID - 1;
  }

  public getById(id: number): Assignment {
    let assignment: Assignment;
    this.assignments.forEach((element) => {
      if (element.id === id) {
        assignment = element;
      }
    });
    return assignment;
  }
}
