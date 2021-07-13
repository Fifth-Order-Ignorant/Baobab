import { Injectable } from '@nestjs/common';
import { Team } from '../../entities/team.entity';
import { TeamDAO } from '../teams';

@Injectable()
export class TeamInMemory implements TeamDAO {
  teams: Team[];
  highestId: number;

  public constructor() {
    this.teams = [];
    this.highestId = 0;
  }

  public async createTeam(userID: number, timestamp: Date, teamName: string): Promise<number> {
    const team = new Team(this.highestId, userID, teamName, timestamp);
    this.teams.push(team);
    this.highestId++;
    return this.highestId - 1;
  }

  public async teamExists(teamName: string): Promise<boolean> {
    let found: boolean;
    found = false;
    this.teams.forEach((element) => {
      if (element.name === teamName) {
        found = true;
      }
    });
    return found;
  }

  public async getById(id: number): Promise<Team> {
    let team: Team;
    this.teams.forEach((element) => {
      if (element.id === id) {
        team = element;
      }
    });
    return team;
  }

  public async getTeams(
  start: number,
    end: number,
  ): Promise<Record<string, string | number>[]> {
    const teams: Team[] = this.teams;
    let i: number = start;
    const lst: Record<string, string | number>[] = [];
    const n: number = teams.length;
    while (i < end && i < n) {
      const team: Team = teams[i];
      const newTeam: Record<string, string | number> = Object({
        author: team.creatorId,
        timestamp: team.timestamp.toISOString(),
      });
      lst.push(newTeam);
      i++;
    }
    return lst;
  }
}
