import { UserProfileDAO } from '../userprofiles';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.entity';
import { Connection, Model } from 'mongoose';
import { Profile } from '../../entities/profile.entity';
import { ProfileResponse } from 'baobab-common';
import { GridFSBucket } from 'mongodb';
import { Role } from '../../entities/role.entity';

export class UserProfileMongoDAO implements UserProfileDAO {
  private _gridFS: GridFSBucket;

  constructor(
    @InjectModel(User.name) private _users: Model<User>,
    @InjectModel(Profile.name) private _profiles: Model<Profile>,
    @InjectConnection() connection: Connection,
  ) {
    this._gridFS = new GridFSBucket(connection.db);
  }

  async addUserProfile(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<number> {
    const id = await this._users.countDocuments();

    await this._users.create({ id: id, email: email, password: password });
    await this._profiles.create({
      id: id,
      firstName: firstName,
      lastName: lastName,
      bio: '',
      externalLinks: [],
      tags: [],
      jobTitle: '',
      role: Role.DEFAULT,
      picture: null,
    });

    return id;
  }

  async editBio(id: number, bio: string): Promise<void> {
    await this._profiles.findByIdAndUpdate(id, { bio: bio });
  }

  async editJob(id: number, jobTitle: string): Promise<void> {
    await this._profiles.findByIdAndUpdate(id, { jobTitle: jobTitle });
  }

  async editName(
    id: number,
    firstName: string,
    lastName: string,
  ): Promise<void> {
    await this._profiles.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName,
    });
  }

  async getPaginatedProfiles(
    start: number,
    end: number,
  ): Promise<ProfileResponse[]> {
    // this is not optimal, optimal approach would be to receive a cursor
    // on the sorting attribute instead

    const queryRes = await this._profiles
      .find()
      .skip(start)
      .limit(end - start)
      .lean({ virtuals: true });

    const profiles: ProfileResponse[] = [];

    for (const profile of queryRes) {
      profiles.push({
        id: profile.id,
        bio: profile.bio,
        firstName: profile.firstName,
        lastName: profile.lastName,
        jobTitle: profile.jobTitle,
        role: profile.role,
      });
    }

    return profiles;
  }

  async getProfileByID(id: number): Promise<Profile> {
    return this._profiles.findById(id).lean<Profile>({ virtuals: true });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this._users.findOne({ email: email }).lean<User>({ virtuals: true });
  }

  async getUserByID(id: number): Promise<User> {
    return this._users.findById(id).lean<User>({ virtuals: true });
  }

  async getUserProfileCount(): Promise<number> {
    return this._users.countDocuments();
  }

  async getProfilePicture(id: number): Promise<NodeJS.ReadableStream> {
    const profile = await this.getProfileByID(id);
    if (profile.picture) {
      return this._gridFS.openDownloadStreamByName(profile.picture.storedName);
    }

    return null;
  }

  async updateProfile(profile: Profile): Promise<Profile> {
    return this._profiles
      .findOneAndUpdate({ id: profile.id }, profile, { new: true })
      .lean({ virtuals: true });
  }
}
