class Accommodation {
    private id: number;
    private description: string;
    private dailyPrice: number;

    constructor(id: number, description: string, dailyPrice: number){
        this.id = id;
        this.description = description;
        this.dailyPrice = dailyPrice;
    }

    getId(): number {
        return this.id;
    }

    getDescription(): string {
        return this.description;
    }

    getDailyPrice(): number {
        return this.dailyPrice;
    }

    setDescription(newDescription: string): void {
        this.description = newDescription;
    }

    setDailyPrice(newDailyPrice: number): void {
        this.dailyPrice = newDailyPrice;
    }

    toStringify(): string{
        return JSON.stringify(this);
    }
}

export default Accommodation;