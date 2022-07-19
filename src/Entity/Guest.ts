import People from "./People";

class Guest extends People {
    private companyId: number;
    private lastAcommodationId: number;
    private city: string
    private registrationDate: Date; 

    constructor(id: number, name: string, cpf: string, contactPhone: Array<string>, city: string, registrationDate: Date = new Date(), company: number = undefined, lastAccommodationId: number = undefined, photo: string = undefined){
        super(id, name, cpf, contactPhone, photo);
        this.companyId = company;
        this.lastAcommodationId = lastAccommodationId;
        this.city = city;
        this.registrationDate = registrationDate;
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