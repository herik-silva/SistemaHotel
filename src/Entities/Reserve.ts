/**
 * Representa uma reserva realizada pelo hospede.
 * A reserva deve ser realizada por um funcionário,
 * onde ele deve conseguir os seguintes dados do hospede: nome e telefone de contato e o
 * quarto que deseja se hospedar(se houver preferência).
 * Com os dados inseridos, o id é gerado pelo banco de dados e a data de criação da reserva
 * gerada no momento que for feito a reserva.
 * Atributos:
 * - id: number -> Idêntificador único da reserva.
 * - guestName: string -> Nome do hospede.
 * - contactPhone: string -> Telefone de contato do hospede.
 * - roomId: number -> idêntificador único do quarto.
 * - 
 */
class Reserve {
    private id: number;
    private guestName: string;
    private contactPhone: string;
    private roomId: number;
    private createdAt: Date;

    constructor(id: number, guestName: string, contactPhone: string, roomId: number, createdAt: Date) {
        this.id = id;
        this.guestName = guestName;
        this.contactPhone = contactPhone;
        this.roomId = roomId;
        this.createdAt = createdAt;
    }

    public getId(): number {
        return this.id;
    }

    public getGuestName(): string {
        return this.guestName;
    }

    public setGuestName(guestName: string): void {
        this.guestName = guestName;
    }

    public getContactPhone(): string {
        return this.contactPhone;
    }

    public setContactPhone(contactPhone: string): void {
        this.contactPhone = contactPhone;
    }

    public getRoomId(): number {
        return this.roomId;
    }

    public setRoomId(roomId: number): void {
        this.roomId = roomId;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }
}

export default Reserve;