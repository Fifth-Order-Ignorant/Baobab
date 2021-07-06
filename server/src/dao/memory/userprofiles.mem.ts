import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { Profile } from '../../entities/profile.entity';
import { ProfileResponse } from 'baobab-common';
import { UserProfileDAO } from '../userprofiles';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

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

  async addUserProfile(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<number> {
    const newUser = new User(this.highestID, email, password);
    this.users.push(newUser);
    const newProfile = new Profile(this.highestID, firstName, lastName);
    this.profiles.push(newProfile);
    this.highestID++;
    this.userProfileCount++;
    return this.highestID - 1;
  }

  async getUserProfileCount(): Promise<number> {
    return this.userProfileCount;
  }

  async getUserByID(id: number): Promise<User> {
    let user: User;

    this.users.forEach((element) => {
      if (element.id === id) {
        user = element;
      }
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    let user: User;

    this.users.forEach((element) => {
      if (element.email === email) {
        user = element;
      }
    });
    return user;
  }

  async getProfileByID(id: number): Promise<Profile> {
    let profile: Profile;

    this.profiles.forEach((element) => {
      if (element.id === id) {
        profile = element;
      }
    });
    return profile;
  }

  async getPaginatedProfiles(
    start: number,
    end: number,
  ): Promise<ProfileResponse[]> {
    const newProfiles: ProfileResponse[] = [];
    const n: number = this.profiles.length;
    let i: number = start;
    while (i < end && i < n) {
      const profile: Profile = this.profiles[i];
      const newProfile: ProfileResponse = Object({
        firstName: profile.firstName,
        lastName: profile.lastName,
        jobTitle: profile.jobTitle,
        bio: profile.bio,
        id: i,
        role: profile.role,
      });
      newProfiles.push(newProfile);
      i++;
    }
    return newProfiles;
  }

  async getProfilePicture(id: number): Promise<NodeJS.ReadableStream> {
    const profile = await this.getProfileByID(id);
    if (profile.picture) {
      return fs.createReadStream(
        path.join(os.tmpdir(), profile.picture.storedName),
      );
    } else {
      return null;
    }
  }

  async updateProfile(profile: Profile): Promise<Profile> {
    for (let i = 0; i < this.profiles.length; i++) {
      if (this.profiles[i].id === profile.id) {
        this.profiles[i] = profile;
        return this.profiles[i];
      }
    }
  }
}
