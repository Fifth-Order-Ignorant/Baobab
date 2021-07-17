import { Team } from '../entities/team.entity';

export interface TeamDAO {
  createTeam(userId: number, timestamp: Date, name: string): Promise<number>;
  getById(id: number): Promise<Team>;
  teamExists(teamName: string): Promise<boolean>;
  getTeams(
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]>;
}
