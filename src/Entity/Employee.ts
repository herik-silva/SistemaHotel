import People from "./People";
import Responsibility from "./Responsibility";

/**
 * Classe que representa um funcionário no sistema.
 * O Funcionário é a entidade que opera o sistema,
 * e sua responsabilidade/cargo tem um nível de acesso no sistema.
 * 
 * @author Herik Aparecida
 */
class Employee extends People {
    private turn: string;
    private salary: number;
    private password: string;
    private responsibility: Responsibility

    constructor(id: number, name: string, cpf: string, contactPhone: Array<string> = [], photo: string = undefined,turn: string, salary: number, password: string, responsability: Responsibility){
        super(id,name,cpf,contactPhone,photo);
        this.turn = turn;
        this.salary = salary;
        this.password = password;
        this.responsibility = responsability;
    }

    getTurn(): string {
        return this.turn;
    }

    getsalary(): number {
        return this.salary;
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

    setsalary(newValue: number): void {
        this.salary = newValue;
    }

    setPassword(newPassword: string): void {
        this.password = newPassword;
    }

    setResponsability(newResponsability: Responsibility): void {
        this.responsibility = newResponsability;
    }
}

export default Employee;