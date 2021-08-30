class Room {
    private roomId: number;
    private status: string;
    private accommodation: Accommodation;

    constructor(roomId: number, status: string, accommodation: Accommodation){
        this.roomId = roomId;
        this.status = status;
        this.accommodation = accommodation;
    }

    getRoomId(): number {
        return this.roomId;
    }

    getStatus(): string {
        return this.status;
    }

    getAccommodation(): Accommodation {
        return this.accommodation;
    }

    setAccommodation(newAccommodation: Accommodation): void {
        this.accommodation = newAccommodation;
    }

    makeRoomReservation(): boolean {
        if(this.status === "livre"){
            this.status = "reservado";
            return true;
        }

        return false;
    }

    vacateRoom(): boolean {
        if(this.status === "reservado"){
            this.status = "limpeza";
            return true;
        }

        return false;
    }

    availableRoom(): boolean {
        if(this.status === "limpeza"){
            this.status = "livre";
            return true;
        }

        return false;
    }
}

export default Room;