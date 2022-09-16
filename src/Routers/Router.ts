import { Request, Response } from "express";

interface Router {
    /**
     * Retorna os dados solicitados pelo cliente.
     * @param request Requisição contendo os dados enviados para o servidor
     * @param response Resposta contendo os dados que serão enviados ao cliente
     */
    get(request: any, response: any): any;

    /**
     * Envia os dados para realizar inserções no banco de dados.
     * @param request Requisição contendo os dados enviados para o servidor
     * @param response Resposta contendo os dados que serão enviados ao cliente
     */
    post(request: any, response: any): any;
    
    /**
     * Envia os dados para realizar atualizações no banco de dados.
     * @param request Requisição contendo os dados enviados para o servidor
     * @param response Resposta contendo os dados que serão enviados ao cliente
     */
    put(request: any, response: any): any;
    
    /**
     * Remove os dados de uma determinada entidade do banco de dados.
     * @param request Requisição contendo os dados enviados para o servidor
     * @param response Resposta contendo os dados que serão enviados ao cliente
     */
    delete(request: any, response: any): any;
}

export default Router;