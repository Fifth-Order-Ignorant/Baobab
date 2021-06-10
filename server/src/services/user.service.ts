import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserProfileDAO } from '../dao/userprofiles';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('UserDAO') private _userRepository: UserProfileDAO) {}

  registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): User {
    if (!this._userRepository.getUserByEmail(email)) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      return this._userRepository.getUserByID(
        this._userRepository.addUserProfile(
          firstName,
          lastName,
          email,
          hashedPassword,
        ),
      );
    }

    return null;
  }
}
