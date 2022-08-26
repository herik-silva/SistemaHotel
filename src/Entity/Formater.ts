abstract class Formater {
    
    static formatContactPhone(number: string): string {
        const formatedString = number.replace(/^(\d{2})(\d)/g,"($1) $2").replace(/(\d)(\d{4})$/,"$1-$2");
        console.log(formatedString);
        return formatedString;
    }

}

export default Formater;