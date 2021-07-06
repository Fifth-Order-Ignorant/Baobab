import { Schema } from 'mongoose';
import { Profile } from '../../../entities/profile.entity';
import { Role } from '../../../entities/role.entity';
import { FileInfoSchema } from './fileinfo.schema';

export const ProfileSchema = new Schema<Profile>(
  {
    _id: {
      type: Number,
      alias: 'id',
    },
    _firstName: {
      type: String,
      required: true,
      alias: 'firstName',
    },
    _lastName: {
      type: String,
      required: true,
      alias: 'lastName',
    },
    _bio: {
      type: String,
      alias: 'bio',
    },
    _externalLinks: {
      type: [String],
      required: true,
      alias: 'externalLinks',
    },
    _jobTitle: {
      type: String,
      alias: 'jobTitle',
    },
    _role: {
      type: String,
      enum: Object.values(Role),
      alias: 'role',
    },
    _picture: {
      type: FileInfoSchema,
      alias: 'picture',
    },
  },
  { id: false },
);

ProfileSchema.loadClass(Profile);
