import { TeamService } from '../services/team.service';
import { Module } from '@nestjs/common';
import { TeamController } from '../controllers/team.controller';
import { TeamInMemory } from '../dao/teams';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TeamController],
  providers: [{ provide: 'TeamDAO', useClass: TeamInMemory }, TeamService],
  exports: [{ provide: 'TeamDAO', useClass: TeamInMemory }],
})
export class TeamModule {}
