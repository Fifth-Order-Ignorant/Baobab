import { FileInfo } from './fileinfo.entity';

export class Assignment {
  private _id: number;
  private _name: string;
  private _description: string;
  private _maxMark: number;
  private _file: FileInfo;

  public constructor(
    id: number,
    name: string,
    description: string,
    maxMark: number,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._maxMark = maxMark;
    this._file = null;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get maxMark(): number {
    return this._maxMark;
  }

  get file(): FileInfo {
    return this._file;
  }

  set file(file: FileInfo) {
    this._file = file;
  }
}
