import Reserve from "./Reserve";

class ViewReserve extends Reserve {
    private employeeName: string;
    private guestName: string;
    private guestPhoto: string;
    private roomPhoto: string;
    private celPhone: string;

    constructor(id: number, entryDate: Date, checkOutDate: Date, amountPeople: number, roomId: number, guest: number, employee: number, status: string, checkinAmount: number, payment: number, observation: string,guestName: string, employeeName: string, guestPhoto: string, roomPhoto: string, celPhone: string, lastCheckin: Date){
        super(id, entryDate, checkOutDate, amountPeople, roomId, guest, employee, status, checkinAmount, payment, observation, lastCheckin);
        this.employeeName = employeeName;
        this.guestName = guestName;
        this.guestPhoto = guestPhoto;
        this.roomPhoto = roomPhoto;
        this.celPhone = celPhone;
    }

    getEmployeeName(): string {
        return this.employeeName;
    }

    getGuestName(): string {
        return this.guestName;
    }

    getGuestPhoto(): string {
        return this.guestPhoto;
    }

    getRoomPhoto(): string {
        return this.roomPhoto;
    }

    getCelPhone(): string {
        return this.celPhone;
    }
}

export default ViewReserve;