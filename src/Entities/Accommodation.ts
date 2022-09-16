/**
 * Representa uma acomodação no sistema.
 * As acomodações são categorias que podem ser atribuídas 
 * em quartos. Uma categoria pode estar em vários quartos, mas
 * em um quarto pode haver apenas uma categoria. As categorias
 * definem o custo da diária em cada quarto.
 * 
 * Categorias contém os seguintes atributos:
 * - id: number -> idêntificador da acomodação(Gerado no banco de dados),
 * - name: string -> nome ou descrição da acomodação,
 * - dailyCost: number -> custo da diária.
 */
class Accommodation {
    private id: number;
    private name: string;
    private dailyCost: number;

    constructor(id: number, name: string, dailyCost: number) {
        this.id = id;
        this.name = name;
        this.dailyCost = dailyCost;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDailyCost(): number {
        return this.dailyCost;
    }

    public setDailyCost(dailyCost: number): void {
        this.dailyCost = dailyCost;
    }
}

export default Accommodation;