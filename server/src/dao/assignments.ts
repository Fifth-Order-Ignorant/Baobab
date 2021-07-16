import { Assignment } from '../entities/assignment.entity';

export interface AssignmentDAO {
  createAssignment(
    name: string,
    description: string,
    maxMark: number,
  ): Promise<number>;
  getById(id: number): Promise<Assignment>;
  getAssignments(start: number, end: number): Promise<Assignment[]>;
}
