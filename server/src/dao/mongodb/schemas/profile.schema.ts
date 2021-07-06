import { Model, Schema } from 'mongoose';
import { Profile } from '../../../entities/profile.entity';
import { Role } from '../../../entities/role.entity';
import { FileInfoSchema } from './fileinfo.schema';

export const ProfileSchema = new Schema<
  Profile,
  Model<Profile>,
  Profile & { _id: Profile['id'] }
>(
  {
    _id: {
      type: Number,
      alias: 'id',
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    externalLinks: {
      type: [String],
      required: true,
    },
    jobTitle: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
    },
    picture: {
      type: FileInfoSchema,
    },
  },
  { id: false },
);

ProfileSchema.loadClass(Profile);
