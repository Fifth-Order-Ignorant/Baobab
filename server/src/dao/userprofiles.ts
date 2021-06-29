import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { ProfileResponse } from 'baobab-common';

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
  getPaginatedProfiles(start: number, end: number): ProfileResponse[];
  editName(id: number, firstName: string, lastName: string): void;
  editJob(id: number, jobTitle: string): void;
  editBio(id: number, bio: string): void;
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

  public editName(id: number, firstName: string, lastName: string): void {
    const profile = this.getProfileByID(id);
    const user = this.getUserByID(id);
    user.firstName = firstName;
    user.lastName = lastName;
    profile.name = user.fullName;
  }

  public editJob(id: number, jobTitle: string): void {
    const profile = this.getProfileByID(id);
    profile.jobTitle = jobTitle;
  }

  public editBio(id: number, bio: string): void {
    const profile = this.getProfileByID(id);
    profile.bio = bio;
  }

  public getPaginatedProfiles(
    start: number,
    end: number,
  ): ProfileResponse[] {
    const newProfiles: Record<string, string>[] = [];
    const n: number = this.profiles.length;
    let i: number = start;
    while (i < end && i < n) {
      const profile: Profile = this.profiles[i];
      const user: User = this.users[i];
      const newProfile: ProfileResponse = Object({
        firstName: user.firstName,
        lastName: user.lastName,
        jobTitle: profile.jobTitle,
        bio: profile.bio,
        id: i,
      });
      newProfiles.push(newProfile);
      i++;
    }
    return newProfiles;
  }
}
