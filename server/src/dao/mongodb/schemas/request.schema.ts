import { Schema } from 'mongoose';
import { Request } from '../../../entities/request.entity';
import { Role } from '../../../entities/role.entity';
import { RequestStatus } from '../../../entities/requeststatus.entity';

export const RequestSchema = new Schema<Request>(
  {
    _id: {
      type: Number,
      alias: 'id',
      required: true,
    },
    _userID: {
      type: Number,
      alias: 'userID',
      required: true,
    },
    _status: {
      type: Number,
      alias: 'status',
      enum: Object.values(RequestStatus),
      required: true,
    },
    _timestamp: {
      type: Date,
      alias: 'timestamp',
      required: true,
    },
    _description: {
      type: String,
      alias: 'description',
      required: true,
    },
    _role: {
      type: String,
      alias: 'role',
      enum: Object.values(Role),
      required: true,
    },
  },
  { id: false },
);

RequestSchema.loadClass(Request);
