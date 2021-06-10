import { Inject, Injectable } from '@nestjs/common';
import { UserProfileDAO } from '../dao/userprofiles';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { SessionPayload } from 'baobab-common';
import * as NodeCache from 'node-cache';

type StaleSession = {
  time: number;
  renewable: boolean;
};

@Injectable()
export class AuthService {
  private _staleSessions: NodeCache;

  constructor(
    @Inject('UserDAO') private _userRepository: UserProfileDAO,
    private _jwtService: JwtService,
  ) {
    this._staleSessions = new NodeCache();
  }

  verifyLogin(email: string, password: string): User {
    const user = this._userRepository.getUserByEmail(email);
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
        fullName: this._userRepository.getUserById(userId).fullName,
        integrityHash: integrityHash,
      }),
      integrityString: integrityString,
    };
  }

  renew(jwt: string): { jwt: string; integrityString: string } {
    const payload = this._jwtService.decode(jwt) as SessionPayload;

    const staleSession = this._staleSessions.get<StaleSession>(payload.id);

    if (staleSession && staleSession.renewable) {
      return this.genJwt(payload.id);
    }

    const now = Date.now() / 1000; // in secs

    if (payload.exp - 60 < now && now < payload.exp) {
      return this.genJwt(payload.id);
    }

    return null;
  }

  async verifyJwt(jwt: string, integrityString: string): Promise<boolean> {
    const payload = this._jwtService.decode(jwt) as SessionPayload;

    const staleSession = this._staleSessions.get<StaleSession>(payload.id);

    if (staleSession && !staleSession.renewable) {
      return false;
    }

    return (
      payload.integrityHash ===
      crypto.createHash('sha256').update(integrityString).digest('hex')
    );
  }

  // todo: when a user changes their password, their previous sessions should be marked stale and not renewable
  markSessionsStale(userId: number, renewable: boolean) {
    this._staleSessions.set<StaleSession>(
      userId,
      {
        time: Date.now() / 1000,
        renewable: renewable,
      },
      Date.now() / 1000 + 30 * 60,
    );
  }
}
