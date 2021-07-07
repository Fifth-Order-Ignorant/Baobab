import { Schema } from 'mongoose';
import { User } from '../../../entities/user.entity';

export const UserSchema = new Schema<User>(
  {
    _id: {
      type: Number,
      alias: 'id',
    },
    _email: {
      type: String,
      required: true,
      alias: 'email',
    },
    _password: {
      type: String,
      required: true,
      alias: 'password',
    },
  },
  { id: false },
);

UserSchema.loadClass(User);
