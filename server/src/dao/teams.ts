import { Team } from '../entities/team.entity';

export interface TeamDAO {
  createTeam(userID: number, timestamp: Date, name: string): number;
  getById(id: number): Team;
  teamExists(teamName: string): boolean;
  getTeams(start: number, end: number): Record<string, string | number>[];
}
