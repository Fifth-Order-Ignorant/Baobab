import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDAO } from '../dao/users';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('UsersInMemory') private _userRepository: UserDAO) {}

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

  verifyLogin(email: string, password: string): User {
    const user = this._userRepository.getByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }
}
