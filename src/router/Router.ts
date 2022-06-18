import { Request, Response } from "express";

/**
 * Interface que deve ser implementada para utilizar
 * roteamento no sistema.
 */
interface Router {

    /**
     * Requisitar dados do servidor
     */
    get(request: any, response: any): any;

    /**
     * Inserir dados no banco de dados.
     */
    post(request: any, response: any): any;

    /**
     * Atualizar dados no banco de dados.
     */
    put(request: any, response: any): any;

    /**
     * Remover dados do banco de dados,
     */
    delete(request: any, response: any): any;
}

export default Router;