import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

export interface UserDAO {
  addUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): number;
  getUserCount(): number;
  getById(id: number): User;
  getByEmail(email: string): User;
}

@Injectable()
export class UsersInMemory implements UserDAO {
  users: User[];
  highestId: number;
  userCount: number;

  public constructor() {
    this.users = [];
    this.highestId = 0;
  }

  public addUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): number {
    const newUser = new User(
      this.highestId,
      firstName,
      lastName,
      email,
      password,
    );
    this.users.push(newUser);
    this.highestId++;
    this.userCount++;
    return this.highestId - 1;
  }

  public getUserCount() {
    return this.userCount;
  }

  public getById(id: number): User {
    let user: User;

    this.users.forEach((element) => {
      if (element.id === id) {
        user = element;
      }
    });
    return user;
  }

  getByEmail(email: string): User {
    let user: User;

    this.users.forEach((element) => {
      if (element.email === email) {
        user = element;
      }
    });

    return user;
  }
}
