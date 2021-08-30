import Employee from "./Employee";
import Guest from "./Guest";
import Room from "./Room";

class Reserve {
    private reserveId: number;
    private entryDate: Date;
    private checkOutDate: Date;
    private amountPeople: number;
    private room: Room;
    private guest: Guest;
    private employee: Employee;
    private status: string;
    private checkinAmount: number;

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

    getRoomNumber(): Room {
        return this.room;
    }

    getGuestId(): Guest {
        return this.guest;
    }

    getEmployeeId(): Employee {
        return this.employee;
    }

    getStatus(): string {
        return this.status;
    }

    getCheckinAmout(): number {
        return this.checkinAmount;
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

    setRoomNumber(newRoom: Room): void {
        this.room = newRoom;
    }

    setGuestId(newGuest: Guest): void {
        this.guest = newGuest;
    }

    setEmployeeId(newEmployee: Employee): void {
        this.employee = newEmployee;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    makeCheckin(): void {
        this.checkinAmount++;
    }

    calculateTotalPayable(): number {
        return this.checkinAmount * this.room.getAccommodation().getDailyPrice();
    }
}

export default Reserve;