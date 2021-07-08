import { RequestStatus } from './requeststatus.entity';
import { Role } from './role.entity';

export class Request {
  private _id: number;
  private _userID: number;
  private _status: RequestStatus;
  private _timestamp: Date;
  private _role: Role;
  private _description: string;

  public constructor(
    id: number,
    userID: number,
    timestamp: Date,
    description: string,
    role: Role,
  ) {
    this._id = id;
    this._userID = userID;
    this._status = RequestStatus.PENDING;
    this._timestamp = timestamp;
    this._description = description;
    this._role = role;
  }

  get id(): number {
    return this._id;
  }

  get userID(): number {
    return this._userID;
  }

  get status(): RequestStatus {
    return this._status;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get role(): Role {
    return this._role;
  }

  get description(): string {
    return this._description;
  }
}