export class User {
  readonly id: number;
  readonly email: string;
  readonly password: string;

  public constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
