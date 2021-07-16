import { AssignmentDAO } from '../assignments';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Assignment } from '../../entities/assignment.entity';
import { GridFSBucket } from 'mongodb';
import { FileInfo } from '../../entities/fileinfo.entity';

/**
 * Save Assignment Entities in a MongoDB Database
 */

export class AssignmentMongoDAO implements AssignmentDAO {
  private _gridFS: GridFSBucket;

  constructor(
    @InjectModel(Assignment.name) private _assignments: Model<Assignment>,
    @InjectConnection() connection: Connection,
  ) {
    this._gridFS = new GridFSBucket(connection.db);
  }

  async createAssignment(
    name: string,
    description: string,
    maxMark: number,
  ): Promise<number> {
    const id = await this._assignments.countDocuments();
    await this._assignments.create(
      new Assignment(id, name, description, maxMark),
    );
    return id;
  }

  async getById(id: number): Promise<Assignment> {
    return this._assignments.findById(id);
  }

  async uploadFile(id: number, inputFile: FileInfo): Promise<boolean> {
    const assignment: Assignment = await this.getById(id);
    if (assignment !== null) {
      assignment.file = inputFile;
      await this._assignments.findByIdAndUpdate(id, assignment, { new: true });
      return true;
    } else {
      return false;
    }
  }

  async getFile(id: number): Promise<FileInfo> {
    const assignment: Assignment = await this.getById(id);
    if (assignment !== null) {
      const file: FileInfo = assignment.file;
      return file;
    } else {
      return null;
    }
  }
}
