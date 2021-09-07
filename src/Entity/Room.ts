class Room {
    private roomId: number;
    private status: string;
    private photo: string;
    private accommodationId: number;

    constructor(roomId: number, status: string, accommodation: number, photo: string){
        this.roomId = roomId;
        this.status = status;
        this.accommodationId = accommodation;
        this.photo = photo;
    }

    getRoomId(): number {
        return this.roomId;
    }

    getStatus(): string {
        return this.status;
    }

    getPhoto(): string {
        return this.photo;
    }

    getAccommodation(): number {
        return this.accommodationId;
    }

    setPhoto(newPhoto: string): void {
        this.photo = newPhoto;
    }

    setAccommodation(newAccommodation: number): void {
        this.accommodationId = newAccommodation;
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