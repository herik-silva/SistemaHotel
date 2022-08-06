import Employee from "./Employee";
import Guest from "./Guest";

class Reserve {
    private reserveId: number;
    private entryDate: Date;
    private checkOutDate: Date;
    private amountPeople: number;
    private roomNumber: number;
    private guest: number;
    private employee: number;
    private status: string;
    private checkinAmount: number;
    private payment: number;

    constructor(id: number, entryDate: Date, checkOutDate: Date, amountPeople: number, roomNumber: number, guest: number, employee: number, status: string, checkinAmount: number, payment: number) {
        this.reserveId = id;
        this.entryDate = entryDate;
        this.checkOutDate = checkOutDate;
        this.amountPeople = amountPeople;
        this.roomNumber = roomNumber;
        this.guest = guest;
        this.employee = employee;
        this.status = status;
        this.checkinAmount = checkinAmount;
        this.payment = payment;
    }

    getReserveId(): number {
        return this.reserveId;
    }

    getEntryDate(): Date {
        return this.entryDate;
    }

    getCheckOutDate(): Date {
        return this.checkOutDate;
    }

    getAmountPeople(): number {
        return this.amountPeople;
    }

    getroomNumberNumber(): number {
        return this.roomNumber;
    }

    getGuestId(): number {
        return this.guest;
    }

    getEmployeeId(): number {
        return this.employee;
    }

    getStatus(): string {
        return this.status;
    }

    getCheckinAmout(): number {
        return this.checkinAmount;
    }

    getPayment(): number {
        return this.payment;
    }

    setReserveId(reserveId: number): void {
        this.reserveId = reserveId;
    }

    setEntryDate(newDate: Date): void {
        this.entryDate = newDate;
    }

    setCheckOutDate(newDate: Date): void {
        this.checkOutDate = newDate;
    }

    setAmountPeople(amoutPeople: number): void {
        this.amountPeople = amoutPeople;
    }

    setroomNumber(newroomNumber: number): void {
        this.roomNumber = newroomNumber;
    }

    setGuestId(newGuest: number): void {
        this.guest = newGuest;
    }

    setEmployeeId(newEmployee: number): void {
        this.employee = newEmployee;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    setPayment(paymentId: number): void {
        this.payment = paymentId;
    }

    makeCheckin(): void {
        this.checkinAmount++;
    }
}

export default Reserve;