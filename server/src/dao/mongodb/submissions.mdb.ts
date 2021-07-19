import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { FileInfo } from '../../entities/fileinfo.entity';
import { SubmissionDAO } from '../submissions';
import { Submission } from '../../entities/submission.entity';

/**
 * Save Submission Entities in a MongoDB Database
 */

export class SubmissionMongoDAO implements SubmissionDAO {
  private _gridFS: GridFSBucket;

  constructor(
    @InjectModel(Submission.name) private _submissions: Model<Submission>,
    @InjectConnection() connection: Connection,
  ) {
    this._gridFS = new GridFSBucket(connection.db);
  }

  async createSubmission(
    userId: number,
    timestamp: Date,
    assignmentId: number,
  ): Promise<number> {
    const id = await this._submissions.countDocuments();
    await this._submissions.create(
      new Submission(id, userId, timestamp, assignmentId),
    );
    return id;
  }

  async getById(id: number): Promise<Submission> {
    return this._submissions.findById(id);
  }

  async uploadFile(id: number, file: FileInfo): Promise<boolean> {
    const submission: Submission = await this.getById(id);
    if (submission !== null) {
      submission.file = file;
      await this._submissions.findByIdAndUpdate(id, submission, { new: true });
      return true;
    } else {
      return false;
    }
  }

  async getFile(id: number): Promise<FileInfo> {
    const submission: Submission = await this.getById(id);
    if (submission !== null) {
      const file: FileInfo = submission.file;
      return file;
    } else {
      return null;
    }
  }

  async getSubmissions(
    start: number,
    end: number,
    assignmentId: number,
  ): Promise<Submission[]> {
    const ans: Submission[] = await this._submissions
      .find(
        await this._submissions.translateAliases({
          assignmentId: assignmentId,
        }),
      )
      .sort(await this._submissions.translateAliases({ timestamp: 'asc' }))
      .skip(start)
      .limit(end - start);
    return ans;
  }
}
