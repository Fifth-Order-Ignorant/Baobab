import { forwardRef, Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UsersInMemory } from '../dao/users';
import { AuthModule } from './auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [{ provide: 'UserDAO', useClass: UsersInMemory }, UserService],
  exports: [{ provide: 'UserDAO', useClass: UsersInMemory }],
})
export class UserModule {}
