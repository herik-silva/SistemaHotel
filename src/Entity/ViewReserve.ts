import Reserve from "./Reserve";

class ViewReserve extends Reserve {
    private employeeName: string;
    private guestName: string;


    constructor(id: number, entryDate: Date, checkOutDate: Date, amountPeople: number, roomId: number, guest: number, employee: number, status: string, checkinAmount: number, payment: number, guestName: string, employeeName: string){
        super(id, entryDate, checkOutDate, amountPeople, roomId, guest, employee, status, checkinAmount, payment);
        this.employeeName = employeeName;
        this.guestName = guestName;
    }

    getEmployeeName(): string {
        return this.employeeName;
    }

    getGuestName(): string {
        return this.guestName;
    }
}

export default ViewReserve;