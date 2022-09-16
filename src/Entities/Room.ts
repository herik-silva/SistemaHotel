/**
 * Representa um quarto no sistema.
 * Os quartos são entidades que serão reservados e ocupados por hospedes. Um quarto pode estar em apenas uma reserva por vez e o mesmo vale para ocupação.
 * A classe tem os seguintes atributos:
 *  - id: number → Idêntificador único do quarto.
 *  - number: number → Número do quarto.
 *  - status: string → Estado atual do quarto(Livre, Reservado, Ocupado, Manutenção).
 *  - accommodationId: number → Idêntificador único de acomodação.
 *  - image: string → nome do arquivo da imagem.
 */
class Room {
    private id: number;
    private number: number;
    private status: string;
    private accommodationId: number;
    private image: string;

    constructor(id: number, number: number, status: string, accommodationId: number, image: string) {
        this.id = id;
        this.number = number;
        this.status = status;
        this.accommodationId = accommodationId;
        this.image = image;
    }

    public getId(): number {
        return this.id;
    }

    public getNumber(): number {
        return this.number;
    }

    public setNumber(number: number): void {
        this.number = number;
    }

    public getStatus(): string {
        return this.status;
    }

    public setStatus(status: string): void {
        this.status = status;
    }

    public getAccommodationId(): number {
        return this.accommodationId;
    }

    public setAccommodation(accommodationId: number): void {
        this.accommodationId = accommodationId;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }
}

export default Room;