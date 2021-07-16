import { Schema } from 'mongoose';
import { Team } from '../../../entities/team.entity';

export const TeamSchema = new Schema<Team>(
  {
    _id: {
      type: Number,
      alias: 'id',
    },
    _creatorId: {
      type: Number,
      required: true,
      alias: 'creatorId',
    },
    _name: {
      type: String,
      required: true,
      alias: 'name',
    },
    _memberIds: {
      type: Array,
      alias: 'memberIds',
    },
    _timestamp: {
      type: Date,
      required: true,
      alias: 'timestamp',
    },
  },
  { id: false },
);

TeamSchema.loadClass(Team);
