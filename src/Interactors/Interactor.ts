import { Connection } from "mysql2/promise";

/**
 * Interface que deve ser implementada para interação
 * com a entidade do interactor e também com o banco de dados.
 * 
 * @author Herik Aparecida
 */
interface Interactor {

    /**
     * Insere a entidade no banco de dados.
     * @param args Argumentos necessários
     */
    insert(...args): any;

    /**
     * Busca uma entidade no banco de dados pela sua Primary Key.
     * @param id identificador único
     */
    findByPk(id: number): any;

    /**
     * Busca uma entidade no banco de dados pelo campo passado.
     * @param args Geralmente Key e Value (Ex: key = "nome", value = "Fulano")
     */
    find(...args): any;

    /**
     * Atualiza a entidade no banco de dados.
     * @param args Argumentos necessários
     */
    update(...args): any;

    /**
     * Remove a entidade do banco de dados.
     * @param id Identificador único
     */
    delete(id: number): any;
}

export default Interactor;