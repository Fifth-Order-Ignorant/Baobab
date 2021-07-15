import { Assignment } from '../entities/assignment.entity';
import { Inject, Injectable } from '@nestjs/common';
import { AssignmentDAO } from '../dao/assignments';
import { FileInfo } from '../entities/fileinfo.entity';

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
      await this._assignmentRepository.createAssignment(
        name,
        description,
        maxMark,
      ),
    );
  }

  async uploadFile(
    assignmentId: number,
    fileName: string,
    mimetype: string,
    size: number,
    storedName: string
  ): Promise<Boolean> {
    return this._assignmentRepository.uploadFile(assignmentId, new FileInfo(fileName, mimetype, size, storedName));
  }
}
