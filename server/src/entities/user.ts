export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    tags: string[];
    
    public constructor(id: number, firstName: string, lastName: string, 
        email: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.tags = [];
    }

    public getId() : number {
        return this.id; 
    }

    public getFullName() : string {
        return this.firstName + " " + this.lastName; 
    }

    public getEmail() : string {
        return this.email;
    }

}