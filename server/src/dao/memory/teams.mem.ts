import { Injectable } from '@nestjs/common';
import { Team } from '../../entities/team.entity';
import { TeamDAO } from '../teams';

@Injectable()
export class TeamInMemory implements TeamDAO {
  teams: Team[];
  highestID: number;

  public constructor() {
    this.teams = [];
    this.highestID = 0;
  }

  public createTeam(userID: number, timestamp: Date, teamName: string): number {
    const team = new Team(this.highestID, userID, teamName, timestamp);
    this.teams.push(team);
    this.highestID++;
    return this.highestID - 1;
  }

  public teamExists(teamName: string): boolean {
    let found: boolean;
    found = false;
    this.teams.forEach((element) => {
      if (element.name === teamName) {
        found = true;
      }
    });
    return found;
  }

  public getById(id: number): Team {
    let team: Team;
    this.teams.forEach((element) => {
      if (element.id === id) {
        team = element;
      }
    });
    return team;
  }

  public getTeams(
    start: number,
    end: number,
  ): Record<string, string | number>[] {
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