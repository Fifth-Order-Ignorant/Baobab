import { Inject, Injectable } from '@nestjs/common';
import { TeamDAO } from '../dao/teams';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamService {
  constructor(@Inject('TeamDAO') private _teamRepository: TeamDAO) {}

  async createTeam(userId: number, timestamp: Date, teamName: string): Promise<Team> {
    return this._teamRepository.getById(
      await this._teamRepository.createTeam(userId, timestamp, teamName),

    );
  }

  async teamExists(teamName: string): Promise<boolean> {
    return this._teamRepository.teamExists(teamName);
  }
}
