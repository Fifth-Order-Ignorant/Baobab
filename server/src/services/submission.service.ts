import { Inject, Injectable } from '@nestjs/common';
import { SubmissionDAO } from '../dao/submissions';
import { AssignmentDAO } from '../dao/assignments';
import { FileInfo } from '../entities/fileinfo.entity';
import { Submission } from '../entities/submission.entity';
import { Assignment } from '../entities/assignment.entity';
import { MulterDAO } from '../dao/files';

@Injectable()
export class SubmissionService {
  constructor(
    @Inject('MulterDAO') private _files: MulterDAO,
    @Inject('SubmissionDAO') private _submissionRepository: SubmissionDAO,
    @Inject('AssignmentDAO') private _assignmentRepository: AssignmentDAO,
  ) {}

  async createSubmission(
    userId: number,
    timestamp: Date,
    assignmentId: number,
  ): Promise<Submission> {
    const submission: Submission =
      await this._submissionRepository.getSubmissionForUser(
        userId,
        assignmentId,
      );
    if (submission) {
      return this._submissionRepository.replaceSubmission(
        submission.id,
        timestamp,
      );
    }
    const assignment: Assignment = await this._assignmentRepository.getById(
      assignmentId,
    );
    if (!assignment) {
      return null;
    }
    return this._submissionRepository.getById(
      await this._submissionRepository.createSubmission(
        userId,
        timestamp,
        assignmentId,
      ),
    );
  }

  async uploadFeedback(
    id: number,
    mark: number,
    feedback: string,
  ): Promise<Submission> {
    return this._submissionRepository.uploadFeedback(id, mark, feedback);
  }

  async uploadFile(
    submissionId: number,
    fileName: string,
    mimetype: string,
    size: number,
    storedName: string,
  ): Promise<boolean> {
    return this._submissionRepository.uploadFile(
      submissionId,
      new FileInfo(fileName, mimetype, size, storedName),
    );
  }

  async getFile(
    submissionId: number,
  ): Promise<{ info: FileInfo; data: NodeJS.ReadableStream }> {
    const submission = await this._submissionRepository.getById(submissionId);
    if (submission.file) {
      return {
        info: submission.file,
        data: await this._files.getFile(submission.file.storedName),
      };
    }
    return null;
  }

  async getPaginatedSubmissions(
    start: number,
    end: number,
    assignmentId: number,
  ): Promise<Submission[]> {
    return this._submissionRepository.getSubmissions(start, end, assignmentId);
  }

  async getSubmissionForUser(
    userId: number,
    assignmentId: number,
  ): Promise<Submission> {
    return this._submissionRepository.getSubmissionForUser(
      userId,
      assignmentId,
    );
  }

  async getCount(assignmentId: number): Promise<number> {
    return this._submissionRepository.getCount(assignmentId);
  }
}
