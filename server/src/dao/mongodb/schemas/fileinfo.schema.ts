import { Model, Schema } from 'mongoose';
import { FileInfo } from '../../../entities/fileinfo.entity';

export const FileInfoSchema = new Schema<FileInfo, Model<FileInfo>, FileInfo>(
  {
    storedName: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);
