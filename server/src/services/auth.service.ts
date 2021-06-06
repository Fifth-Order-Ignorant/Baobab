import { Inject, Injectable } from '@nestjs/common';
import { UserDAO } from '../dao/users';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { SessionPayload } from 'baobab-common';

@Injectable()
export class AuthService {
  // todo: handle jwt invalidation (change of password, change of name, etc)
  private _staleJwts = [];
  private _invalidJwts = [];

  constructor(
    @Inject('UserDAO') private _userRepository: UserDAO,
    private _jwtService: JwtService,
  ) {}

  verifyLogin(email: string, password: string): User {
    const user = this._userRepository.getByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  genJwt(userId: number): { jwt: string; integrityString: string } {
    const integrityString = crypto.randomBytes(50).toString('hex');
    const integrityHash = crypto
      .createHash('sha256')
      .update(integrityString)
      .digest('hex');

    return {
      jwt: this._jwtService.sign({
        id: userId,
        fullName: this._userRepository.getById(userId).fullName,
        integrityHash: integrityHash,
      }),
      integrityString: integrityString,
    };
  }

  renew(jwt: string): { jwt: string; integrityString: string } {
    const payload = this._jwtService.decode(jwt) as SessionPayload;

    const now = Date.now() / 1000; // in secs

    if (payload.exp - 60 < now && now < payload.exp) {
      return this.genJwt(payload.id);
    }

    return null;
  }

  verifyJwt(jwt: string, integrityString: string): boolean {
    const payload = this._jwtService.decode(jwt) as SessionPayload;
    return (
      payload.integrityHash ===
      crypto.createHash('sha256').update(integrityString).digest('hex')
    );
  }
}
