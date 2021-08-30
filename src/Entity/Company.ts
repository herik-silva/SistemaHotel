class Company {
    private id: number;
    private name: string;
    private email: string;
    private phone: Array<string>;
    private cnpj: string;

    constructor(id: number, name: string, email: string, phone: Array<string>, cnpj: string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.cnpj = cnpj;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPhone(): Array<string> {
        return this.phone;
    }

    getCnpj(): string {
        return this.cnpj;
    }

    setName(newName: string): void {
        this.name = newName;
    }

    setEmail(newEmail: string): void {
        this.email = newEmail;
    }

    setCnpj(newCnpj: string): void {
        this.cnpj = newCnpj;
    }

    addPhone(newNumber: string): boolean {
        if(this.phone.length < 2){
            this.phone.push(newNumber);
            return true;
        }

        throw "Número máximo de telefone de contato atingido!";
    }

    public removePhone(numberId: number): void {
        switch(numberId){
            case 1:
                this.phone.shift();
                break;

            case 2:
                this.phone.pop();
                break;

            default:
                throw "Id inválido!";
        }
    }
}

export default Company;