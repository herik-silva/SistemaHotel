import People from "./People";

class Guest extends People {
    private companyId: number;
    private lastAcommodationId: number;

    constructor(id: number, name: string, cpf: string, contactPhone: Array<string>, city: string, company: number = undefined, lastAccommodationId: number = undefined, photo: string = undefined){
        super(id, name, cpf, contactPhone, photo, city);
        this.companyId = company;
        this.lastAcommodationId = lastAccommodationId;
    }

    getCompany(): number {
        return this.companyId;
    }

    getLastAccommodationId(): number {
        return this.lastAcommodationId;
    }

    setCompany(newCompany: number): void {
        this.companyId = newCompany;
    }
    
    setLastAccommodationId(newId: number): void {
        this.lastAcommodationId = newId;
    }
}

export default Guest;