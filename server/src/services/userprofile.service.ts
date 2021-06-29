import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserProfileDAO } from '../dao/userprofiles';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { ProfileResponse } from 'baobab-common';

@Injectable()
export class UserProfileService {
  constructor(
    @Inject('UserProfileDAO') private _userProfileRepository: UserProfileDAO,
  ) {}

  registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): [User, Profile] {
    if (!this._userProfileRepository.getUserByEmail(email)) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const id: number = this._userProfileRepository.addUserProfile(
        firstName,
        lastName,
        email,
        hashedPassword,
      );
      return [
        this._userProfileRepository.getUserByID(id),
        this._userProfileRepository.getProfileByID(id),
      ];
    }

    return null;
  }

  isValidProfile(id: number): boolean {
    if (!this._userProfileRepository.getProfileByID(id)) {
      return false;
    }
    return true;
  }

  editJob(id: number, jobTitle: string): void {
    this._userProfileRepository.editJob(id, jobTitle);
  }

  editName(id: number, firstName: string, lastName: string): void {
    this._userProfileRepository.editName(id, firstName, lastName);
  }

  editBio(id: number, bio: string): void {
    this._userProfileRepository.editBio(id, bio);
  }

  getProfile(id: number): [string, string, string, string] {
    const user = this._userProfileRepository.getUserByID(id);
    const profile = this._userProfileRepository.getProfileByID(id);
    return [user.firstName, user.lastName, profile.jobTitle, profile.bio];
  }

  getPaginatedProfiles(start: number, end: number): ProfileResponse[] {
    return this._userProfileRepository.getPaginatedProfiles(start, end);
  }
}
