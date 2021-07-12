import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { ProfileResponse } from 'baobab-common';

export interface UserProfileDAO {
  addUserProfile(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<number>;
  getUserProfileCount(): Promise<number>;
  getUserById(id: number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getProfileById(id: number): Promise<Profile>;
  getPaginatedProfiles(start: number, end: number): Promise<ProfileResponse[]>;
  updateProfile(profile: Profile): Promise<Profile>;
}
