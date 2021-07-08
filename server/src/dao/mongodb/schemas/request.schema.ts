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
      required: true,
    },
    _status: {
      type: Number,
      enum: Object.values(RequestStatus),
      required: true,
    },
    _timestamp: {
      type: Date,
      required: true,
    },
    _description: {
      type: String,
      required: true,
    },
    _role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
  },
  { id: false },
);

RequestSchema.loadClass(Request);
