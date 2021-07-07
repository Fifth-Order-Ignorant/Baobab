import { Model, Schema } from 'mongoose';
import { Request } from '../../../entities/request.entity';
import { Role } from '../../../entities/role.entity';
import { RequestStatus } from '../../../entities/requeststatus.entity';

export const RequestSchema = new Schema<
  Request,
  Model<Request>,
  Request & { _id: Request['id'] }
>(
  {
    _id: {
      type: Number,
      alias: 'id',
      required: true,
    },
    userID: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      enum: Object.values(RequestStatus),
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true
    }
  },
  { id: false },
);

RequestSchema.loadClass(Request);