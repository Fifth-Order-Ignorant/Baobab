import { Schema } from 'mongoose';
import { FileInfo } from '../../../entities/fileinfo.entity';

export const FileInfoSchema = new Schema<FileInfo>(
  {
    _storedName: {
      type: String,
      required: true,
      alias: 'storedName',
    },
    _mimetype: {
      type: String,
      required: true,
      alias: 'mimetype',
    },
    _originalName: {
      type: String,
      required: true,
      alias: 'originalName',
    },
    _size: {
      type: Number,
      required: true,
      alias: 'size',
    },
  },
  { _id: false },
);

FileInfoSchema.loadClass(FileInfo);
