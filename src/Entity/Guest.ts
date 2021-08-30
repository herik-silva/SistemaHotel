import Company from "./Company";
import People from "./People";

class Guest extends People {
    private company: Company;
    private lastAcommodationId: number;

    getCompany(): Company {
        return this.company;
    }

    getLastAccommodationId(): number {
        return this.lastAcommodationId;
    }

    setCompany(newCompany: Company): void {
        this.company = newCompany;
    }
    
    setLastAccommodationId(newId: number): void {
        this.lastAcommodationId = newId;
    }
}

export default Guest;