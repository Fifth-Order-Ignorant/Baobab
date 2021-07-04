import { TeamService } from '../services/team.service';
import { Module } from '@nestjs/common';
import { TeamController } from '../controllers/team.controller';
import { AuthModule } from './auth.module';
import { InMemoryDAOModule } from './memory.module';

@Module({
  imports: [AuthModule, InMemoryDAOModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
