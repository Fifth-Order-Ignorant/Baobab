export class Team {
  private _id: number;
  private _creatorId: number;
  private _name: string;
  private _memberIds: number[];
  private _timestamp: Date;

  public constructor(
    id: number,
    creatorId: number,
    name: string,
    timestamp: Date,
  ) {
    this._id = id;
    this._creatorId = creatorId;
    this._name = name;
    this._memberIds = [];
    this._timestamp = timestamp;
  }

  get id(): number {
    return this._id;
  }

  get creatorId(): number {
    return this._creatorId;
  }

  get name(): string {
    return this._name;
  }

  get memberIds(): number[] {
    return this._memberIds;
  }

  get timestamp(): Date {
    return this._timestamp;
  }
}
