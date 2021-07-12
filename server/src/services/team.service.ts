import { Inject, Injectable } from '@nestjs/common';
import { TeamDAO } from '../dao/teams';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamService {
  constructor(@Inject('TeamDAO') private _teamRepository: TeamDAO) {}

  createTeam(userId: number, timestamp: Date, teamName: string): Team {
    return this._teamRepository.getById(
      this._teamRepository.createTeam(userId, timestamp, teamName),
    );
  }

  teamExists(teamName: string): boolean {
    return this._teamRepository.teamExists(teamName);
  }
}
