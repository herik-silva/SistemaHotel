import { writeFileSync } from "fs";
import Log from "../Entity/Log";
import interactor from "./Interactor";

/**
 * Classe que realiza interação com logs, registrando-os em
 * um arquivo .txt
 * @author Herik Aparecida
 */
class LogInteractor implements interactor {
    private logPath: string;

    /**
     * Construtor padrão para um objeto LogInteractor.
     * @param path Caminho do arquivo a partir da pasta Interactor
     * Exemplo: "../../logs/seuArquivo.txt"
     */
    constructor(path: string) {
        this.logPath = `${__dirname}/${path}`;
    }
    
    /**
     * Método não precisa ser implementado
    */
    getConnection(): any {
        throw "Não implementado";
    }
    
    /**
     * Método não precisa ser implementado
     */
    delete() {
        throw "Não implementado";
    }

    /**
     * Método não precisa ser implementado
     */
    find() {
        throw "Não Implementado";
    }

    /**
     * Método não precisa ser implementado
     */
    findByPk() {
        throw "Não Implementado";
    }

    /**
     * Registra um novo log no sistema.
     * @param title Titulo do log: "Funcionário Cadastrado"
     * @param description Descrição do log, Exemplo: "O funcionário Fulano 
     * foi cadastrado"
     */
    insert(title: string, description: string): void {
        if(title.length>0 && description.length>0){
            const newLog = new Log(title, description);
            writeFileSync(this.logPath, newLog.getLog(),{flag: "a+"});
        }
        else{
            throw "Strings vazias não são válidas.";
        }
    }

    /**
     * Método não precisa ser implementado
     */
    update() {
        throw "Não Implementado";
    }
}

export default LogInteractor;