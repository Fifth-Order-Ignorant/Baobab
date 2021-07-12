import { UserProfileDAO } from '../userprofiles';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from '../../entities/user.entity';
import { Connection, Model } from 'mongoose';
import { Profile } from '../../entities/profile.entity';
import { ProfileResponse } from 'baobab-common';
import { GridFSBucket } from 'mongodb';
import { Injectable } from '@nestjs/common';

/**
 * Save UserProfileEntities in a MongoDB Database
 */
@Injectable()  
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

    await this._users.create(new User(id, email, password));
    await this._profiles.create(new Profile(id, firstName, lastName));

    return id;
  }

  async getPaginatedProfiles(
    start: number,
    end: number,
  ): Promise<ProfileResponse[]> {
    // this is not optimal, optimal approach would be to receive a cursor
    // on the sorting attribute instead

    const queryRes: Profile[] = await this._profiles
      .find()
      .sort(this._profiles.translateAliases({ id: 1 }))
      .skip(start)
      .limit(end - start);

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
    return this._profiles.findById(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this._users.findOne(this._users.translateAliases({ email }));
  }

  async getUserByID(id: number): Promise<User> {
    return this._users.findById(id);
  }

  async getUserProfileCount(): Promise<number> {
    return this._users.countDocuments();
  }

  async updateProfile(profile: Profile): Promise<Profile> {
    return this._profiles.findByIdAndUpdate(profile.id, profile, {
      new: true,
    });
  }
}
