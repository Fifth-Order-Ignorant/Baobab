import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private UserService: UsersService) {
    super();
  }

  async validate(password: string, email: string): Promise<any> {
    const user = this.UserService.getUser(email);

    const samePassword = bcrypt.compareSync(password, hash); // get hash from user class

    if (!user || !samePassword) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
