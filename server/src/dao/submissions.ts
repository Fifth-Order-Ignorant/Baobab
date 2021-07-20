import { Submission } from '../entities/submission.entity';
import { FileInfo } from '../entities/fileinfo.entity';

export interface SubmissionDAO {
  createSubmission(
    userId: number,
    timestamp: Date,
    assignmentId: number,
  ): Promise<number>;
  getById(id: number): Promise<Submission>;
  uploadFile(id: number, file: FileInfo): Promise<boolean>;
  getFile(id: number): Promise<FileInfo>;
  uploadFeedback(
    id: number,
    mark: number,
    feedback: string,
  ): Promise<Submission>;
  replaceSubmission(id: number, timestamp: Date): Promise<Submission>;
  getSubmissions(
    start: number,
    end: number,
    assignmentId: number,
  ): Promise<Submission[]>;
  getSubmissionForUser(
    userId: number,
    assignmentId: number,
  ): Promise<Submission>;
}
