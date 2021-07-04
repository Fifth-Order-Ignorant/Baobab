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
