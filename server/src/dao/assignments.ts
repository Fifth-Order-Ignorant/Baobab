import { FileInfo } from '../entities/fileinfo.entity';
import { Assignment } from '../entities/assignment.entity';

export interface AssignmentDAO {
  createAssignment(
    name: string,
    description: string,
    maxMark: number,
  ): Promise<number>;
  getById(id: number): Promise<Assignment>;
  uploadFile(id: number, file: FileInfo): Promise<boolean>;
  getFile(id: number): Promise<FileInfo>;
}
