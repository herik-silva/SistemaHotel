/**
 * Classe que representa um Log(Registro) do que
 * é feito no sistema. O primeiro parâmetro em seu construtor
 * é o titulo do log e o segundo sua descrição.
 * 
 * @author Herik Aparecida
 */
class Log {
    private date: string;
    private title: string;
    private description: string;

    /**
     * Construtor padrão para um objeto Log.
     * @param title Titulo do Log
     * @param description Descrição do Log
     */
    constructor(title: string, description: string) {
        const date = new Date();
        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        } as Intl.DateTimeFormatOptions;
        
        this.date = date.toLocaleDateString("pt-BR", options);
        this.title = title;
        this.description = description;
    }

    /**
     * Formata e retorna o conteúdo do log
     * @returns
     */
    public getLog(): string {
        const formattedContent = `[${this.date}] ${this.title}: ${this.description}\n`;

        return formattedContent;
    }
}

export default Log;