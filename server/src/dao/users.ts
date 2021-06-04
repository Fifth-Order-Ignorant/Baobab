
import { User } from "../entities/user";


export interface usersDAO {
    addUser(firstName: string, lastName: string, email: string): number;
    getUserCount(): number;
    getById(id: number): User;

}

export class UsersInMemory implements usersDAO {
    users: User[];
    highestId: number; 
    userCount: number;

    public constructor() {
        this.users = [];
        this.highestId = 0;
    }

    public addUser(firstName: string, lastName: string, email: string) : number {
        var newUser:User;
        newUser = new User(this.highestId, firstName, lastName, email);
        this.users.push(newUser);
        this.highestId++;
        this.userCount++;
        return this.highestId - 1;
    }

    public getUserCount() {
        return this.userCount;
    }

    public getById(id: number): User {
        let user: User; 
        
        this.users.forEach(element => {
            console.log(element.getId(), id);
            if (element.getId() == id) {
                user = element;
            }
        });
        return user;
    }
    
}
