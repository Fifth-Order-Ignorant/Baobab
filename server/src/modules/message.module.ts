import { Module } from '@nestjs/common';
import { MessageController } from '../controllers/message.controller';
import { MessageService } from '../services/message.service';
import { MessageInMemory } from '../dao/messages';
import { AuthModule } from './auth.module';
import { UserProfilesInMemory } from '../dao/userprofiles';

@Module({
  imports: [AuthModule],
  controllers: [MessageController],
  providers: [
    { provide: 'UserProfileDAO', useClass: UserProfilesInMemory },
    { provide: 'MessageDAO', useClass: MessageInMemory },
    MessageService,
  ],
  exports: [
    { provide: 'UserProfileDAO', useClass: UserProfilesInMemory },
    { provide: 'MessageDAO', useClass: MessageInMemory },
  ],
})
export class MessageModule {}
