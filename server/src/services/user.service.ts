import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDAO } from '../dao/userprofiles';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('UserDAO') private _userRepository: UserDAO) {}

  registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): User {
    if (!this._userRepository.getByEmail(email)) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      return this._userRepository.getById(
        this._userRepository.addUser(
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
