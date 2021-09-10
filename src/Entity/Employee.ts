import People from "./People";
import Responsibility from "./Responsibility";

class Employee extends People {
    private turn: string;
    private currentWage: number;
    private password: string;
    private responsibilityId: number;

    constructor(id: number, name: string, cpf: string, contactPhone: Array<string> = [], photo: string = undefined,turn: string, currentWage: number, password: string, responsabilityId: number){
        super(id,name,cpf,contactPhone,photo);
        this.turn = turn;
        this.currentWage = currentWage;
        this.password = password;
        this.responsibilityId = responsabilityId;
    }

    getTurn(): string {
        return this.turn;
    }

    getCurrentWage(): number {
        return this.currentWage;
    }

    getPassword(): string {
        return this.password;
    }

    getResponsability(): number {
        return this.responsibilityId;
    }

    setTurn(newTurn: string) {
        this.turn = newTurn;
    }

    setCurrentWage(newValue: number): void {
        this.currentWage = newValue;
    }

    setPassword(newPassword: string): void {
        this.password = newPassword;
    }

    setResponsability(newResponsability: number): void {
        this.responsibilityId = newResponsability;
    }
}

export default Employee;