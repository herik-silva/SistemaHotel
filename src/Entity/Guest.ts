import People from "./People";

class Guest extends People {
    private companyId: number;
    private lastAcommodationId: number;
    private city: string

    constructor(id: number, name: string, cpf: string, contactPhone: Array<string>, city: string, company: number = undefined, lastAccommodationId: number = undefined, photo: string = undefined){
        super(id, name, cpf, contactPhone, photo);
        this.companyId = company;
        this.lastAcommodationId = lastAccommodationId;
        this.city = city;
    }

    getCompany(): number {
        return this.companyId;
    }

    getLastAccommodationId(): number {
        return this.lastAcommodationId;
    }

    getCity(): string {
        return this.city;
    }

    setCompany(newCompany: number): void {
        this.companyId = newCompany;
    }
    
    setLastAccommodationId(newId: number): void {
        this.lastAcommodationId = newId;
    }

    setCity(newCity: string): void {
        this.city = newCity;
    }
}

export default Guest;