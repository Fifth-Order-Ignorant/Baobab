import { Model, Schema } from 'mongoose';
import { User } from '../../../entities/user.entity';

export const UserSchema = new Schema<
  User,
  Model<User>,
  User & { _id: User['id'] }
>(
  {
    _id: {
      type: Number,
      alias: 'id',
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { id: false },
);

UserSchema.loadClass(User);
