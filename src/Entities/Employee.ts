import Role from "./Role";

class Employee {
    private id: number;
    private name: string;
    private password: string;
    private turn: string;
    private role: Role;

    constructor(id: number, name: string, password: string, turn: string, role: Role) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.turn = turn;
        this.role = role;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getTurn(): string {
        return this.turn;
    }

    public setTurn(turn: string): void {
        this.turn = turn;
    }

    public getRole(): Role {
        return this.role;
    }

    public setRole(role: Role): void {
        this.role = role;
    }

}

export default Employee;