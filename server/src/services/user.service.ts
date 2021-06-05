import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      firstname: 'john',
      lastname: 'doe',
      password: 'changeme',
      id: 0,
      email: 'ethan@mail.com',
    },
    {
      userId: 1,
      firstname: 'john',
      lastname: 'doe',
      password: 'changeme',
      id: 0,
      email: 'ethan@mail.com',
    },
  ];

  getUserByEmail(email: string) {
    return this.users[1];
  }
}
