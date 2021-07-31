import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserProfileDAO } from '../dao/userprofiles';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { ProfileResponse } from 'baobab-common';
import { FileInfo } from '../entities/fileinfo.entity';
import { stringToRole } from '../entities/role.entity';
import { MulterDAO } from '../dao/files';

@Injectable()
export class UserProfileService {
  constructor(
    @Inject('MulterDAO') private _files: MulterDAO,
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
        await this._userProfileRepository.getUserById(id),
        await this._userProfileRepository.getProfileById(id),
      ];
    }

    return null;
  }

  async isValidProfile(id: number): Promise<boolean> {
    if (!(await this._userProfileRepository.getProfileById(id))) {
      return false;
    }
    return true;
  }

  async editJob(id: number, jobTitle: string): Promise<void> {
    const profile = await this._userProfileRepository.getProfileById(id);
    profile.jobTitle = jobTitle;
    await this._userProfileRepository.updateProfile(profile);
  }

  async editName(
    id: number,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    const profile = await this._userProfileRepository.getProfileById(id);
    profile.firstName = firstName;
    profile.lastName = lastName;
    await this._userProfileRepository.updateProfile(profile);
  }

  async editBio(id: number, bio: string): Promise<void> {
    const profile = await this._userProfileRepository.getProfileById(id);
    profile.bio = bio;
    await this._userProfileRepository.updateProfile(profile);
  }

  async editRole(id: number, role: string): Promise<void> {
    const profile = await this._userProfileRepository.getProfileById(id);
    profile.role = stringToRole(role);
    await this._userProfileRepository.updateProfile(profile);
  }

  async editLinks(id: number, links: string[]): Promise<void> {
    const profile = await this._userProfileRepository.getProfileById(id);
    profile.externalLinks = links;
    await this._userProfileRepository.updateProfile(profile);
  }

  async getLinks(id: number): Promise<string[]> {
    const profile = await this._userProfileRepository.getProfileById(id);
    return profile.externalLinks;
  }

  isValidRole(requestRole: string): boolean {
    return stringToRole(requestRole) != null;
  }

  async getProfile(
    id: number,
  ): Promise<[string, string, string, string, string]> {
    const profile = await this._userProfileRepository.getProfileById(id);
    return [
      profile.firstName,
      profile.lastName,
      profile.jobTitle,
      profile.bio,
      profile.role.toString(),
    ];
  }

  async getFullName(id: number): Promise<string> {
    const profile = await this._userProfileRepository.getProfileById(id);
    return profile.name;
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
    const profile = await this._userProfileRepository.getProfileById(id);
    if (profile.picture) {
      await this._files.deleteFile(profile.picture.storedName);
    }
    profile.picture = new FileInfo(originalName, mimetype, size, storedName);
    await this._userProfileRepository.updateProfile(profile);
  }

  async getPicture(
    id: number,
  ): Promise<{ info: FileInfo; data: NodeJS.ReadableStream }> {
    const profile = await this._userProfileRepository.getProfileById(id);
    if (profile.picture) {
      return {
        info: profile.picture,
        data: await this._files.getFile(profile.picture.storedName),
      };
    }
    return null;
  }
}
