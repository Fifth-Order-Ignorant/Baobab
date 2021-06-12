export class User {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _tags: string[];
  private _password: string;

  public constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._tags = [];
    this._password = password;
  }

  get id(): number {
    return this._id;
  }

  get fullName(): string {
    return this._firstName + ' ' + this._lastName;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(name: string) {
    this._firstName = name;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(name: string) {
    this._lastName = name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
