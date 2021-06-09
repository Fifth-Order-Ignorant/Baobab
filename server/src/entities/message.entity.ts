export class Message {
    private _id: number;
    private _userId: number;
    private _content: string;
    private _childs: Message[];
    private _parent: Message;
  
    public constructor(
      id: number,
      userId: number,
      content: string,
      parent: Message,
    ) {
      this._id = id;
      this._userId = userId;
      this._content = content;
      this._parent = parent;
      this._childs = [];
    }
  
    get id(): number {
      return this._id;
    }
  
    get userID(): number {
      return this._userId;
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
  }
  
