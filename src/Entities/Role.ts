class Role {
    private id: number;
    private name: string;
    private accessLevel: number;

    constructor(id: number, name: string, accessLevel: number) {
        this.id = id;
        this.name = name;
        this.accessLevel = accessLevel;
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

    public getAccessLevel(): number {
        return this.accessLevel;
    }

    public setAccessLevel(accessLevel: number): void {
        this.accessLevel = accessLevel;
    }
}

export default Role;