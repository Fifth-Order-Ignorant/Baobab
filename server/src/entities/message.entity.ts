export class Message {
  private _id: number;
  private _userID: number;
  private _content: string;
  private _timestamp: Date;
  private _childs: Message[];
  // If no parent, _parent is undefined.
  private _parent: Message;

  public constructor(
    id: number,
    userID: number,
    content: string,
    timestamp: Date,
    parent: Message,
  ) {
    this._id = id;
    this._userID = userID;
    this._content = content;
    this._timestamp = timestamp;
    this._parent = parent;
    this._childs = [];
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

  get childs(): Message[] {
    return this._childs;
  }

  get parent(): Message {
    return this._parent;
  }

  get timestamp(): Date {
    return this._timestamp;
  }
}
