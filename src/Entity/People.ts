abstract class People {
    protected id: number;
    protected name: string;
    protected contactPhone: Array<string>;
    protected cpf: string;
    protected photo: string;
    protected city: string;
    
    constructor(id: number, name: string, cpf: string, contactPhone: Array<string> = [], photo: string = undefined, city: string){
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.contactPhone = contactPhone;
        this.photo = photo;
        this.city = city;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getContactPhone(): Array<string> {
        return this.contactPhone;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public getPhoto(): string {
        return this.photo;
    }

    public getCity(): string {
        return this.city;
    }

    public setPhoto(newPhoto: string) {
        this.photo = newPhoto;
    }

    public setCpf(newCpf: string): void {
        this.cpf = newCpf;
    }

    public setName(newName: string): void {
        this.name = newName;
    }

    public setCity(newCity: string): void {
        this.city = newCity;
    }

    public addContactPhone(newNumber: string): boolean {
        if(this.contactPhone.length<2){
            this.contactPhone.push(newNumber);
            return true;
        }

        return false;
    }

    public removeContactPhone(numberId: number): void {
        switch(numberId){
            case 1:
                this.contactPhone.shift();
                break;

            case 2:
                this.contactPhone.pop();
                break;

            default:
                throw "Id inválido!";
        }
    }
}

export default People;