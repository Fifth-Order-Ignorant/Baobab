import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from '../modules/db.module';
import { UsersInMemory } from '../dao/users';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "'ethanisawesome'",
      signOptions: {
        expiresIn: '60m',
      },
    }),
    DbModule,
  ],
  controllers: [UserController],
  providers: [{ provide: 'Users', useClass: UsersInMemory }, UserService],
})
export class AppModule {}
