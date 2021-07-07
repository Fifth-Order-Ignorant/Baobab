import { Assignment } from '../entities/assignment.entity';

export interface AssignmentDAO {
  createAssignment(name: string, description: string, maxMark: number): number;
  getById(id: number): Assignment;
}
