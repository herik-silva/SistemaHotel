class Responsibility {
    private id: number;
    private name: string;
    private description: string;
    private acessLevel: number;

    constructor(id: number, name: string , acessLevel: number, description: string = ""){
        this.id = id;
        this.name = name;
        this.acessLevel = acessLevel;
        this.description = description;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getAcessLevel(): number {
        return this.acessLevel;
    }

    setName(newName: string): void {
        this.name = newName;
    }

    setDescription(newDescription: string): void {
        this.description = newDescription;
    }

    setAcessLevel(newAcessLevel: number): void {
        this.acessLevel = newAcessLevel;
    }
}

export default Responsibility;