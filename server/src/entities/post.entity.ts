export class Post {
  private _id: number;
  private _userID: number;
  private _content: string;
  private _timestamp: Date;
  // If no parent, _parent is undefined.
  private _parent: Post;

  public constructor(
    id: number,
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
  ) {
    this._id = id;
    this._userID = userID;
    this._content = content;
    this._timestamp = timestamp;
    this._parent = parent;
  }

  get id(): number {
    return this._id;
  }

  get userID(): number {
    return this._userID;
  }

  get content(): string {
    return this._content;
  }

  get parent(): Post {
    return this._parent;
  }

  get timestamp(): Date {
    return this._timestamp;
  }
}
