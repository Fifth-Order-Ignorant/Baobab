import { Tag } from './tag.entity';

export class Post {
  private _id: number;
  private _userID: number;
  private _content: string;
  private _timestamp: Date;
  // If no parent, _parent is undefined.
  private _parent: Post;
  private _tags: Tag[];

  public constructor(
    id: number,
    userID: number,
    content: string,
    timestamp: Date,
    parent: Post,
    tags: Tag[]
  ) {
    this._id = id;
    this._userID = userID;
    this._content = content;
    this._timestamp = timestamp;
    this._parent = parent;
    this._tags = tags
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

  get tags(): Tag[] {
    return this._tags;
  }
}
