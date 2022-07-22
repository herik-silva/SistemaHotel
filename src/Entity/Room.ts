class Room {
    private id: number;
    private number: number;
    private status: string;
    private photo: string;
    private accommodationId: number;

    constructor(id: number, number: number, status: string, accommodation: number, photo: string){
        this.id = id;
        this.number = number;
        this.status = status;
        this.accommodationId = accommodation;
        this.photo = photo;
    }

    getId(): number {
        return this.id;
    }

    getNumber(): number {
        return this.number;
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