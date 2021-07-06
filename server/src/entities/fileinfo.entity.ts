export class FileInfo {
  originalName: string;
  mimetype: string;
  size: number;
  storedName: string;

  constructor(
    originalName: string,
    mimetype: string,
    size: number,
    storedName: string,
  ) {
    this.originalName = originalName;
    this.mimetype = mimetype;
    this.size = size;
    this.storedName = storedName;
  }
}
