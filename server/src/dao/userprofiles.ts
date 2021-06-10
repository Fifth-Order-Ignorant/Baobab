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
  getUserByID(id: number): User;
  getUserByEmail(email: string): User;
  getProfileByID(id: number): Profile;
  getPaginatedProfiles(start: number, end: number): Record<string, string>[];
  editProfile(id: number, firstName: string, lastName: string, jobTitle: string, bio: string): void;
}

@Injectable()
export class UserProfileInMemory implements UserProfileDAO {
  users: User[];
  profiles: Profile[];
  highestID: number;
  userProfileCount: number;

  public constructor() {
    this.users = [];
    this.profiles = [];
    this.highestID = 0;
    this.userProfileCount = 0;
  }

  public addUserProfile(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): number {
    const newUser = new User(
      this.highestID,
      firstName,
      lastName,
      email,
      password,
    );
    this.users.push(newUser);
    const newProfile = new Profile(this.highestID, firstName + ' ' + lastName);
    this.profiles.push(newProfile);
    this.highestID++;
    this.userProfileCount++;
    return this.highestID - 1;
  }

  public getUserProfileCount() {
    return this.userProfileCount;
  }

  public getUserByID(id: number): User {
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

  public getProfileByID(id: number): Profile {
    let profile: Profile;

    this.profiles.forEach((element) => {
      if (element.id === id) {
        profile = element;
      }
    });
    return profile;
  }

  public editProfile(id: number, firstName: string, lastName: string, jobTitle: string, bio: string): void {
    const profile = this.getProfileByID(id);
    const user = this.getUserByID(id);
    user.firstName = firstName;
    user.lastName = lastName;
    profile.name = user.fullName;
    profile.jobTitle = jobTitle;
    profile.bio = bio;
  }

  public getPaginatedProfiles(
    start: number,
    end: number,
  ): Record<string, string>[] {
    const newProfiles: Record<string, string>[] = [];
    const n: number = this.profiles.length;
    let i: number = start;
    while (i < end && i < n) {
      const profile: Profile = this.profiles[i];
      const newProfile: Record<string, string> = Object({
        name: profile.name,
        role: profile.role,
        aboutMe: profile.bio,
      });
      newProfiles.push(newProfile);
      i++;
    }
    return newProfiles;
  }
}
