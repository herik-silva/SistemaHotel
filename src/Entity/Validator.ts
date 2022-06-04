type Context = "CPF" | "CNPJ";

/**
 * Classe abstrata responsável por validar
 * informações como CPF e CNPJ
 * @author Herik Aparecida
 */
abstract class Validator {

    /**
     * Remove todos os caracteres da string.
     * @param input string que será removida os caracteres especiais
     * @param listOfChars lista de strings contendo os caracteres que serão removidos
     * @returns 
     */
    private static removeSpecialChars(input: string, listOfChars: Array<string>): string {
        var newValue = input;

        for(let character of listOfChars){
            while(newValue.includes(character)){
                newValue = newValue.replace(character, "");
            }
        }

        return  newValue;
    }

    /**
     * Dado um input fornecido, retorna todos os valores convertidos e separados
     * @param input Input fornecedor dos valores
     * @param context Contexto em que se encontra
     * @returns Retorna todos os valores do input
     */
    private getValues(input: string, context: Context): Array<number> {
        var start = 0, end = 1;
        var values: Array<number> = [];

        if(context == "CPF"){
            for(let charNumber=0; charNumber<input.length; charNumber++){
                values.push(parseInt(input.substring(start, end)));

                start++;
                end++;
            }
        }
        
        return values;
    }

    public static validateCPF(input: string): boolean {
        const newInput = this.removeSpecialChars(input, [".", "-"]);

        // A fazer...
    }
}

export default Validator;