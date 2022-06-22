import { Request, Response } from "express";
import Status from "../Entity/Status";
import Database from "../Interactor/Database";
import MessageInteractor from "../Interactor/MessageInteractor";
import Router from "./Router";

/**
 * Router responsável por receber todas as requisições
 * vindo da rota message e encaminhar os dados para camada
 * Interactor.
 * 
 * Consulte a interface Router para saber mais sobre
 * cada um dos métodos.
 * 
 * @author Herik Aparecida
 */
class MessageRouter implements Router {

    private messageInteractor: MessageInteractor;

    constructor(database: Database) {
        this.messageInteractor = new MessageInteractor(database);
    }

    async get(request: Request, response: Response): Promise<Response> {
        const messageId = request.body.id as number;

        if(messageId){
            const message = await this.messageInteractor.findByPk(messageId);

            if(message){
                return response.status(Status.OK.code).json(message);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async post(request: Request, response: Response): Promise<Response> {
        const messageData = request.body;

        if(messageData){
            const hasInserted = await this.messageInteractor.insert(
                messageData.subject,
                messageData.content,
                messageData.senderId,
                messageData.recipientId
            );

            if(hasInserted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.ER_DUP_ENTRY.code).json(Status.ER_DUP_ENTRY);
    }
    
    async put(request: Request, response: Response): Promise<Response> {
        const messageData = request.body;

        if(messageData){
            const hasUpdated = await this.messageInteractor.update(
                messageData.id,
                messageData.subject,
                messageData.content
            );

            if(hasUpdated){
                return response.status(Status.OK.code).json(Status.OK);
            }

            return response.status(Status.OK.code).json(Status.OK);
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const messageId = request.body.id as number;

        if(messageId){
            const hasDeleted = await this.messageInteractor.delete(messageId);

            if(hasDeleted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }
}

export default MessageRouter;