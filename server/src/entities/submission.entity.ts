import { FileInfo } from './fileinfo.entity';

export class Submission {
  private _id: number;
  private _userId: number;
  private _assignmentId: number;
  private _timestamp: Date;
  private _file: FileInfo;

  public constructor(
    id: number,
    userId: number,
    timestamp: Date,
    assignmentId: number,
  ) {
    this._id = id;
    this._userId = userId;
    this._assignmentId = assignmentId;
    this._timestamp = timestamp;
    this._file = null;
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this._userId;
  }

  get assignmentId(): number {
    return this._assignmentId;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get file(): FileInfo {
    return this._file;
  }

  set file(value: FileInfo) {
    this._file = value;
  }
}
