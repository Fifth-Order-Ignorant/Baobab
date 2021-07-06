export class FileInfo {
  private _originalName: string;
  private _mimetype: string;
  private _size: number;
  private _storedName: string;

  constructor(
    originalName: string,
    mimetype: string,
    size: number,
    storedName: string,
  ) {
    this._originalName = originalName;
    this._mimetype = mimetype;
    this._size = size;
    this._storedName = storedName;
  }

  get storedName(): string {
    return this._storedName;
  }
  get size(): number {
    return this._size;
  }
  get mimetype(): string {
    return this._mimetype;
  }
  get originalName(): string {
    return this._originalName;
  }
}
