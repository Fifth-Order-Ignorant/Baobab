import { Injectable } from '@nestjs/common';
import { Assignment } from '../entities/assignment.entity';
import { AssignmentResponse } from 'baobab-common';

export interface AssignmentDAO {
  createAssignment(name: string, description: string, maxMark: number): number;
  getById(id: number): Assignment;
  getPaginatedAssignments(start: number, end: number): AssignmentResponse[];
}

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

  public getPaginatedAssignments(
    start: number,
    end: number,
  ): AssignmentResponse[] {
    const newAssignments: AssignmentResponse[] = [];
    const n: number = this.assignments.length;
    let i: number = start;
    while (i < end && i < n) {
      const assignment: Assignment = this.assignments[i];
      const newAssignment: AssignmentResponse = Object({
        id: i,
        name: assignment.name,
        description: assignment.description,
        maxMark: assignment.maxMark,
      });
      newAssignments.push(newAssignment);
      i++;
    }
    return newAssignments;
  }
}
