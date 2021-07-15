import { Injectable } from '@nestjs/common';
import { FileInfo } from '../../entities/fileinfo.entity';
import { Assignment } from '../../entities/assignment.entity';
import { AssignmentDAO } from '../assignments';

@Injectable()
export class AssignmentInMemory implements AssignmentDAO {
  assignments: Assignment[];
  highestId: number;
  assignmentCount: number;

  public constructor() {
    this.assignments = [];
    this.highestId = 0;
    this.assignmentCount = 0;
  }

  public async createAssignment(
    name: string,
    description: string,
    maxMark: number,
  ): Promise<number> {
    const assignment = new Assignment(
      this.highestId,
      name,
      description,
      maxMark,
    );
    this.assignments.push(assignment);
    this.highestId++;
    return this.highestId - 1;
  }

  public async getById(id: number): Promise<Assignment> {
    let assignment: Assignment = null;
    this.assignments.forEach((element) => {
      if (element.id === id) {
        assignment = element;
      }
    });
    return assignment;
  }

  public async uploadFile(id: number, file: FileInfo): Promise<Boolean> {
    const assignment: Assignment = await this.getById(id);
    if (assignment !== null) {
      assignment.file = file;
      return true;
    } else {
      return false;
    }
  }

  public async getFile(id: number): Promise<FileInfo> {
    const assignment: Assignment = await this.getById(id);
    if (assignment !== null) {
      return assignment.file;
    } else {
      return null;
    }
  }
}
