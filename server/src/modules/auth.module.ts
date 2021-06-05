import { Module } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../services/user.service';

@Module({
  imports: [
    UsersService,
    PassportModule,
    JwtModule.register({
      secret: 'ethanisawesome',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UsersService, AuthGuard('local')],
  exports: [UsersService, JwtModule],
})
export class AuthModule {}
