import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserProfileDAO } from '../dao/userprofiles';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { SessionPayload } from 'baobab-common';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

type StaleSession = {
  time: number;
  renewable: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserProfileDAO') private _userRepository: UserProfileDAO,
    private _jwtService: JwtService,
    @Inject(CACHE_MANAGER) private _cacheManager: Cache,
    private _configService: ConfigService,
  ) {}

  async verifyLogin(email: string, password: string): Promise<User> {
    const user = await this._userRepository.getUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async genJwt(userId: number): Promise<{
    jwt: string;
    integrityString: string;
    payload: SessionPayload;
  }> {
    const integrityString = crypto.randomBytes(50).toString('hex');
    const integrityHash = crypto
      .createHash('sha256')
      .update(integrityString)
      .digest('hex');

    const profile = await this._userRepository.getProfileById(userId);

    const jwt = this._jwtService.sign({
      id: userId,
      fullName: profile.name,
      integrityHash: integrityHash,
      role: profile.role,
    });

    const payload = this._jwtService.verify<SessionPayload>(jwt);

    return {
      jwt: jwt,
      integrityString: integrityString,
      payload: payload,
    };
  }

  // only verified payloads should be passed in here
  async renew(payload: SessionPayload): Promise<{
    jwt: string;
    integrityString: string;
    payload: SessionPayload;
  }> {
    const staleSession = await this._cacheManager.get<StaleSession>(
      payload.id.toString(),
    );

    if (
      staleSession &&
      staleSession.renewable &&
      payload.iat >= staleSession.time
    ) {
      return this.genJwt(payload.id);
    }

    const now = Date.now() / 1000; // in secs

    if (payload.exp - this._configService.get<number>('jwtExp') / 2 < now) {
      return this.genJwt(payload.id);
    }

    return null;
  }

  async verifyJwt(
    payload: SessionPayload,
    integrityString: string,
  ): Promise<boolean> {
    const staleSession = await this._cacheManager.get<StaleSession>(
      payload.id.toString(),
    );

    if (staleSession && !staleSession.renewable) {
      return false;
    }

    return (
      payload.integrityHash ===
      crypto.createHash('sha256').update(integrityString).digest('hex')
    );
  }

  // todo: when a user changes their password, their previous sessions should be marked stale and not renewable
  async markSessionsStale(userId: number, renewable: boolean) {
    await this._cacheManager.set<StaleSession>(
      userId.toString(),
      {
        time: Date.now() / 1000,
        renewable: renewable,
      },
      { ttl: this._configService.get<number>('jwtExp') },
    );
  }
}
