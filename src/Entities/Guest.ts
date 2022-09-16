/**
 * Representa um hospede no sistema.
 * Os hospedes são hospedados em um determinado quarto, realizando uma ocupação.
 * A classe tem os seguintes atributos:
 *  - id: number → Idêntificador único de um hospede.
 *  - name: string → Nome do hospede.
 *  - CPF: string → Cadastro de pessoa física do hospede.
 *  - contactPhone: string → Telefone de contato do hospede.
 *  - sex: string→ Sexo do hospede(M/F).
 *  - city: string → Cidade do hospede.
 *  - lastAccommodationId: number → idêntificador único de uma acomodação. A última acomodação em que o hospede ficou hospedado.
 *  - createdAt: Date → Data de cadastro do hospede.
 */
class Guest {
    private id: number;
    private name: string;
    private CPF: string;
    private contactPhone: string;
    private sex: string;
    private city: string;
    private lastAccommodationId: number;
    private createdAt: Date;

    constructor(id: number, name: string, CPF: string, contactPhone: string, sex: string, city: string, lastAccommodationId: number, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.CPF = CPF;
        this.contactPhone = contactPhone;
        this.sex = sex;
        this.city = city;
        this.lastAccommodationId = lastAccommodationId;
        this.createdAt = createdAt;
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

    public getCPF(): string {
        return this.CPF;
    }

    public setCPF(CPF: string): void {
        this.CPF = CPF;
    }

    public getContactPhone(): string {
        return this.contactPhone;
    }

    public setContactPhone(contactPhone: string): void {
        this.contactPhone = contactPhone;
    }

    public getSex(): string {
        return this.sex;
    }

    public setSex(sex: string): void {
        this.sex = sex;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public getLastAccommodationId(): number {
        return this.lastAccommodationId;
    }

    public setLastAccommodationId(lastAccommodationId: number): void {
        this.lastAccommodationId = lastAccommodationId;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }



}

export default Guest;