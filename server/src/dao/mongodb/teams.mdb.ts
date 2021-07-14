import { TeamDAO } from '../teams';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from '../../entities/team.entity';
import { Model } from 'mongoose';

export class TeamMongoDAO implements TeamDAO {
  constructor(@InjectModel(Team.name) private _teams: Model<Team>) {}

  async createTeam(
    userId: number,
    timestamp: Date,
    teamName: string,
  ): Promise<number> {
    const id = await this._teams.countDocuments();
    await this._teams.create(new Team(id, userId, teamName, timestamp));
    return id;
  }

  async teamExists(name: string): Promise<boolean> {
    let found: boolean;
    found = false;
    if (await this._teams.findOne(this._teams.translateAliases({ name }))) {
      found = true;
    }
    return found;
  }

  async getById(id: number): Promise<Team> {
    return this._teams.findById(id);
  }

  async getTeams(
    start: number,
    end: number,
  ): Promise<Record<string, string | number>[]> {
    const queryRes: Team[] = await this._teams
      .find()
      .skip(start)
      .limit(end - start);

    const teams: Record<string, string | number>[] = [];

    for (const team of queryRes) {
      const newTeam: Record<string, string | number> = Object({
        author: team.creatorId,
        timestamp: team.timestamp.toISOString(),
      });
      teams.push(newTeam);
    }
    return teams;
  }
}
