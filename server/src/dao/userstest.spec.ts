import { identity } from "rxjs";
import { UsersInMemory, usersDAO } from "./users";
import { User } from "../entities/user"; 

describe('User tests', () => {
    it('should create a user', () => {
        let users: UsersInMemory;
        users = new UsersInMemory();

        users.addUser('Michael', 'Sheinman Orenstrakh', 'michael092001@gmail.com');
        expect(users.getUserCount() == 1);
    })

    it('should return a valid user given id', () => {
        let users: usersDAO;
        users = new UsersInMemory();
        let user_id: number; 
        user_id = users.addUser('Michael', 'Sheinman Orenstrakh', 'michael092001@gmail.com');
        let user: User;
        user = users.getById(user_id);
        expect(user.getEmail() == 'michael092001@gmail.com');
    })
    
})