import { TeamInMemory } from '../src/dao/teams';
import { UserProfileInMemory } from '../src/dao/userprofiles';
import { Test } from '@nestjs/testing';

describe('Team Creation Test', () => {
    it('should create a post with valid id', () => { 
        const teams = new TeamInMemory();
        const nowTime = new Date();
        const users = new UserProfileInMemory();
        const userId = users.addUserProfile("Michael", "Sheinman", 
            "michael092001@gmail.com", "1234");

        const teamId = teams.createTeam(userId, nowTime, "FIF");                
        expect(teams.getByID(teamId).id == teamId);
    })
})