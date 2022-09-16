class Occupation {
    private id: number;
    private reserveId: number;
    private initDate: Date;
    private endDate: Date;
    private guestId: number;
    private employeeId: number;
    private lastCheckin: Date;
    private amountCheckin: number;
    private amountPeople: number;
    private observations: string;

    constructor(id: number, reserveId: number, initDate: Date, endDate: Date, guestId: number, employeeId: number, lastCheckin: Date, amountCheckin: number, amountPeople: number, observations: string) {
        this.id = id;
        this.reserveId = reserveId;
        this.initDate = initDate;
        this.endDate = endDate;
        this.guestId = guestId;
        this.employeeId = employeeId;
        this.lastCheckin = lastCheckin;
        this.amountCheckin = amountCheckin;
        this.amountPeople = amountPeople;
        this.observations = observations;
    }

    public getId(): number {
        return this.id;
    }

    public getReserveId(): number {
        return this.reserveId;
    }

    public setReserveId(reserveId: number): void {
        this.reserveId = reserveId;
    }

    public getInitDate(): Date {
        return this.initDate;
    }

    public setInitDate(initDate: Date): void {
        this.initDate = initDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    public getGuestId(): number {
        return this.guestId;
    }

    public setGuestId(guestId: number): void {
        this.guestId = guestId;
    }

    public getEmployeeId(): number {
        return this.employeeId;
    }

    public setEmployeeId(employeeId: number): void {
        this.employeeId = employeeId;
    }

    public getLastCheckin(): Date {
        return this.lastCheckin;
    }

    public setLastCheckin(lastCheckin: Date): void {
        this.lastCheckin = lastCheckin;
    }

    public getAmountCheckin(): number {
        return this.amountCheckin;
    }

    public setAmountCheckin(amountCheckin: number): void {
        this.amountCheckin = amountCheckin;
    }

    public getAmountPeople(): number {
        return this.amountPeople;
    }

    public setAmountPeople(amountPeople: number): void {
        this.amountPeople = amountPeople;
    }

    public getObservations(): string {
        return this.observations;
    }

    public setObservations(observations: string): void {
        this.observations = observations;
    }

}

export default Occupation;