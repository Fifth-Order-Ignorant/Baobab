export class User {
  private _id: number;
  private _email: string;
  private _password: string;

  public constructor(id: number, email: string, password: string) {
    this._id = id;
    this._email = email;
    this._password = password;
  }

  get password(): string {
    return this._password;
  }
  get email(): string {
    return this._email;
  }

  get id(): number {
    return this._id;
  }
}
