import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserProfileDAO } from '../dao/userprofiles';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { ProfileResponse } from 'baobab-common';
import { FileInfo } from '../entities/fileinfo.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @Inject('UserProfileDAO') private _userProfileRepository: UserProfileDAO,
  ) {}

  async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<[User, Profile]> {
    if (!(await this._userProfileRepository.getUserByEmail(email))) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const id: number = await this._userProfileRepository.addUserProfile(
        firstName,
        lastName,
        email,
        hashedPassword,
      );
      return [
        await this._userProfileRepository.getUserByID(id),
        await this._userProfileRepository.getProfileByID(id),
      ];
    }

    return null;
  }

  async isValidProfile(id: number): Promise<boolean> {
    if (!(await this._userProfileRepository.getProfileByID(id))) {
      return false;
    }
    return true;
  }

  async editJob(id: number, jobTitle: string): Promise<void> {
    await this._userProfileRepository.editJob(id, jobTitle);
  }

  async editName(
    id: number,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await this._userProfileRepository.editName(id, firstName, lastName);
  }

  async editBio(id: number, bio: string): Promise<void> {
    await this._userProfileRepository.editBio(id, bio);
  }

  async getProfile(id: number): Promise<[string, string, string, string]> {
    const profile = await this._userProfileRepository.getProfileByID(id);
    return [profile.firstName, profile.lastName, profile.jobTitle, profile.bio];
  }

  async getPaginatedProfiles(
    start: number,
    end: number,
  ): Promise<ProfileResponse[]> {
    return this._userProfileRepository.getPaginatedProfiles(start, end);
  }

  async editPicture(
    id: number,
    originalName: string,
    mimetype: string,
    size: number,
    storedName: string,
  ) {
    const profile = await this._userProfileRepository.getProfileByID(id);
    profile.picture = new FileInfo(originalName, mimetype, size, storedName);
    await this._userProfileRepository.updateProfile(profile);
  }

  async getPicture(id: number): Promise<NodeJS.ReadableStream> {
    return this._userProfileRepository.getProfilePicture(id);
  }

  async getPictureInfo(id: number): Promise<FileInfo> {
    const profile = await this._userProfileRepository.getProfileByID(id);
    return profile.picture;
  }
}
