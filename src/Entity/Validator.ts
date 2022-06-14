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
     * Dado um input fornecido, retorna todos os valores convertidos em números e separados
     * de acordo com o contexto.
     * @param input Input fornecedor dos valores
     * @param context Contexto em que se encontra
     * @returns Retorna todos os valores do input
     */
    private static getValues(input: string, context: Context): Array<number> {
        const values: Array<number> = [];
        var start = 0, end = 1;
        var stringValues: string;

        if(context == "CPF"){
            stringValues = this.removeSpecialChars(input, [".", "-"]);
        }
        else{
            stringValues = this.removeSpecialChars(input, [".", "/", "-"]);
        }

        for(let charNumber=0; charNumber<stringValues.length; charNumber++){
            values.push(parseInt(stringValues.substring(start, end)));

            start++;
            end++;
        }
        
        return values;
    }

    /**
     * Verifica se todos os valores são iguais.
     * @param values Lista de Números para serem checados.
     * @returns Retorna FALSE se todos os números são iguais e TRUE caso contrário.
     */
    private static checkNumbers(values: Array<number>): boolean {
        const selectedNumber = values[0];
        const equalsSelectedNumber = values.filter(number => number == selectedNumber);
        
        if(equalsSelectedNumber.length == values.length){
            return false;
        }

        return true;
    }

    /**
     * Método responsável por validar um CPF.
     * @param input CPF com os caracteres especiais (xxx.xxx.xxx-xx).
     * @returns Retorna TRUE caso o CPF seja válido e FALSE caso contrário.
     */
    public static validateCPF(input: string): boolean {
        const values = this.getValues(input, "CPF");
        console.log("CPF");

        if(this.checkNumbers(values)){
            var weight = 10;
            var skippedDigits = 2; // Digitos finais que serão ignorados na soma
            
            for(var currentDigit=1; currentDigit<=2; currentDigit++){
                var result: number;
                var totalSum = 0;
                var length = values.length - skippedDigits;
    
                for(let index=0; index<length; index++){
                    totalSum += values[index] * (weight - index);
                }
    
                result = (totalSum * 10) % 11;

                // Caso o resto da divisão for 10 deve ser considerado como 0
                if(result == 10){
                    result = 0;
                }

                // Caso o resto da divisão seja diferente do digito atual o CPF é inválido
                if(result != values[length]){
                    return false;
                }
    
                // Atualizando o peso para que na próxima iteração seja 11.
                weight++;
    
                // Na próxima iteração deve ser ignorado apenas o último digito.
                skippedDigits--;
            }

            return true;
        }

        return false;
    }

    public static validateCNPJ(input: string): boolean {
        const values = this.getValues(input, "CNPJ");
        console.log("CNPJ");
        console.log(values);

        if(this.checkNumbers(values)){
            var skippedDigits = 2;
            
            for(var currentDigit=1; currentDigit<=2; currentDigit++){
                var result: number;
                var rest: number;
                var weight = 2;
                var totalSum = 0;
                var length = values.length - skippedDigits;

                for(let index=length-1; index>=0; index--){
                    if(weight==10){
                        weight = 2;
                    }

                    totalSum += values[index] * weight;
                    weight++;
                }

                console.log(`Resultado: ${totalSum}`);
                
                if(currentDigit == 1){
                    if(rest > 1){
                        rest = totalSum % 11;
                        result = 11 - rest;
                    }
                    else{
                        result = 0;
                    }
                }
                else{
                    result = totalSum % 11;
                }


                if(result != values[length]){
                    return false;
                }
            }
            
            return true;
        }

        return false;
    }
}

export default Validator;