import { writeFileSync } from "fs";
import Log from "./Log";

/**
 * Classe que realiza interação com logs, registrando-os em
 * um arquivo .txt
 * @author Herik Aparecida
 */
abstract class LogInteractor {
    private static logPath: string = `${__dirname}/../../logs/log.txt`;

    /**
     * Registra um novo log no sistema.
     * @param title Titulo do log: "Funcionário Cadastrado"
     * @param description Descrição do log, Exemplo: "O funcionário Fulano 
     * foi cadastrado"
     */
    public static insert(title: string, description: string): void {
        if(title.length>0 && description.length>0){
            const newLog = new Log(title, description);
            writeFileSync(this.logPath, newLog.getLog(),{flag: "a+"});
        }
        else{
            throw "Strings vazias não são válidas.";
        }
    }
}

export default LogInteractor;