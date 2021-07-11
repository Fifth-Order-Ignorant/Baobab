import { TeamService } from '../services/team.service';
import { Module } from '@nestjs/common';
import { TeamController } from '../controllers/team.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
