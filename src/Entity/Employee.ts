import People from "./People";
import Responsibility from "./Responsibility";

class Employee extends People {
    private turn: string;
    private currentWage: number;
    private password: string;
    private responsibility: Responsibility;

    getTurn(): string {
        return this.turn;
    }

    getCurrentWage(): number {
        return this.currentWage;
    }

    getPassword(): string {
        return this.password;
    }

    getResponsability(): Responsibility {
        return this.responsibility;
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

    setResponsability(newResponsability: Responsibility): void {
        this.responsibility = newResponsability;
    }
}

export default Employee;