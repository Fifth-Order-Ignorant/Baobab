import { Schema } from 'mongoose';
import { Assignment } from '../../../entities/assignment.entity';
import { FileInfoSchema } from './fileinfo.schema';

export const AssignmentSchema = new Schema<Assignment>(
  {
    _id: {
      type: Number,
      alias: 'id',
    },
    _name: {
      type: String,
      required: true,
      alias: 'name',
    },
    _description: {
      type: String,
      required: true,
      alias: 'description',
    },
    _maxMark: {
      type: Number,
      required: true,
      alias: 'maxMark',
    },
    _file: {
      type: FileInfoSchema,
      alias: 'file',
    },
  },
  { id: false },
);
AssignmentSchema.loadClass(Assignment);
