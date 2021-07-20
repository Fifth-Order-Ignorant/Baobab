import { FileInfo } from './fileinfo.entity';

export class Submission {
  private _id: number;
  private _userId: number;
  private _assignmentId: number;
  private _mark: number;
  private _feedback: string;
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
    this._mark = null;
    this._feedback = '';
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

  set timestamp(value: Date) {
    this._timestamp = value;
  }

  get mark(): number {
    return this._mark;
  }

  set mark(value: number) {
    this._mark = value;
  }

  get feedback(): string {
    return this._feedback;
  }

  set feedback(value: string) {
    this._feedback = value;
  }

  get file(): FileInfo {
    return this._file;
  }

  set file(value: FileInfo) {
    this._file = value;
  }
}
