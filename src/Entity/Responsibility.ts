class Responsibility {
    private id: number;
    private name: string;
    private description: string;
    private acessLevel: number;

    constructor(id: number, name: string , acessLevel: number){
        this.id = id;
        this.name = name;
        this.acessLevel = acessLevel;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
    
    getAcessLevel(): number {
        return this.acessLevel;
    }

    setName(newName: string): void {
        this.name = newName;
    }

    setAcessLevel(newAcessLevel: number): void {
        this.acessLevel = newAcessLevel;
    }
}

export default Responsibility;