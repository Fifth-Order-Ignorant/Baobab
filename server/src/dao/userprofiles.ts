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
  getUserByID(id: number): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getProfileByID(id: number): Promise<Profile>;
  getPaginatedProfiles(start: number, end: number): Promise<ProfileResponse[]>;
  editName(id: number, firstName: string, lastName: string): Promise<void>;
  editJob(id: number, jobTitle: string): Promise<void>;
  editBio(id: number, bio: string): Promise<void>;
  getProfilePicture(id: number): Promise<NodeJS.ReadableStream>;
  updateProfile(profile: Profile): Promise<Profile>;
}
