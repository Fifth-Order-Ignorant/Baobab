export interface MulterDAO {
  getFile(storedName: string): Promise<NodeJS.ReadableStream>;
  deleteFile(storedName: string): Promise<void>;
}
