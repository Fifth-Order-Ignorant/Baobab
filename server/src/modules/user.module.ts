import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UsersInMemory } from '../dao/users';
import { JwtStrategy } from '../controllers/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'helloworld',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UserController],
  providers: [
    { provide: 'UserRepository', useClass: UsersInMemory },
    UserService,
    JwtStrategy,
  ],
})
export class UserModule {}
