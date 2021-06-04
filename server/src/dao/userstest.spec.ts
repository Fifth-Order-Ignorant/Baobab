import { identity } from "rxjs";
import { UsersInMemory, UsersDAO } from "./users";
import { User } from "../entities/user"; 

describe('User tests', () => {
    it('should create a user', () => {
        let users: UsersInMemory;
        users = new UsersInMemory();

        users.addUser('Michael', 'Sheinman Orenstrakh', 'michael092001@gmail.com');
        expect(users.getUserCount() == 1);
    })

    it('should return a valid user given id', () => {
        let users: UsersDAO;
        users = new UsersInMemory();
        let userId: number; 
        userId = users.addUser('Michael', 'Sheinman Orenstrakh', 'michael092001@gmail.com');
        let user: User;
        user = users.getById(userId);
        expect(user.getEmail() == 'michael092001@gmail.com');
    })
    
})