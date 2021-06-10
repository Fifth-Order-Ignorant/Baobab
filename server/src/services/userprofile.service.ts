import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserProfileDAO } from '../dao/userprofiles';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';

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

  public getPaginatedProfiles(
    start: number,
    end: number,
  ): Record<string, string>[] {
    return this._userProfileRepository.getPaginatedProfiles(start, end);
  }
}
