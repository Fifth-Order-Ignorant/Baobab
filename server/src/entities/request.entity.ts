import { RequestStatus } from './requeststatus.entity';
import { Role } from './role.entity';

export class Request {
  id: number;
  userID: number;
  status: RequestStatus;
  timestamp: Date;
  role: Role;
  description: string;

  public constructor(
    id: number,
    userID: number,
    timestamp: Date,
    description: string,
    role: Role,
  ) {
    this.id = id;
    this.userID = userID;
    this.status = RequestStatus.PENDING;
    this.timestamp = timestamp;
    this.description = description;
    this.role = role;
  }
}
