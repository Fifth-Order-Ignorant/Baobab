import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';

export interface UserProfileDAO {
  addUserProfile(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): number;
  getUserProfileCount(): number;
  getUserById(id: number): User;
  getUserByEmail(email: string): User;
  getProfileById(id: number): Profile;
}

@Injectable()
export class UserProfilesInMemory implements UserProfileDAO {
  users: User[];
  profiles: Profile[];
  highestId: number;
  userProfileCount: number;

  public constructor() {
    this.users = [];
    this.profiles = [];
    this.highestId = 0;
    this.userProfileCount = 0;
  }

  public addUserProfile(
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
    const newProfile = new Profile(this.highestId, firstName + ' ' + lastName);
    this.profiles.push(newProfile);
    this.highestId++;
    this.userProfileCount++;
    return this.highestId - 1;
  }

  public getUserProfileCount() {
    return this.userProfileCount;
  }

  public getUserById(id: number): User {
    let user: User;

    this.users.forEach((element) => {
      if (element.id === id) {
        user = element;
      }
    });
    return user;
  }

  public getUserByEmail(email: string): User {
    let user: User;

    this.users.forEach((element) => {
      if (element.email === email) {
        user = element;
      }
    });
    return user;
  }

  public getProfileById(id: number): Profile {
    let profile: Profile;

    this.profiles.forEach((element) => {
      if (element.id === id) {
        profile = element;
      }
    });
    return profile;
  }
}
