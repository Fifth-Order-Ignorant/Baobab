import { Schema } from 'mongoose';
import { Submission } from '../../../entities/submission.entity';
import { FileInfoSchema } from './fileinfo.schema';

export const SubmissionSchema = new Schema<Submission>(
  {
    _id: {
      type: Number,
      alias: 'id',
    },
    _userId: {
      type: Number,
      alias: 'userId',
    },
    _assignmentId: {
      type: Number,
      alias: 'assignmentId',
    },
    _timestamp: {
      type: Date,
      required: true,
      alias: 'timestamp',
    },
    _file: {
      type: FileInfoSchema,
      alias: 'file',
    },
  },
  { id: false },
);
SubmissionSchema.loadClass(Submission);
