import { Request, Response } from "express";
import Status from "../Entity/Status";
import Database from "../Interactor/Database";
import RoomInteractor from "../Interactor/RoomInteractor";
import Router from "./Router";

/**
 * Router responsável por receber todas as requisições
 * vindo da rota room e encaminhar os dados para camada
 * Interactor.
 * 
 * Consulte a interface Router para saber mais sobre
 * cada um dos métodos.
 * 
 * @author Herik Aparecida
 */
class RoomRouter implements Router {

    private roomInteractor: RoomInteractor;

    constructor(database: Database) {
        this.roomInteractor = new RoomInteractor(database);
    }

    async get(request: Request, response: Response): Promise<Response> {
        const roomNumber = request.body.number as number;

        if(roomNumber){
            const room = await this.roomInteractor.findByPk(roomNumber);

            if(room){
                return response.status(Status.OK.code).json(room);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async post(request: Request, response: Response): Promise<Response> {
        const roomData = request.body;
        
        if(roomData){
            const hasInserted = await this.roomInteractor.insert(
                roomData.number,
                roomData.photo,
                roomData.status,
                roomData.accommodation
            );

            if(hasInserted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.ER_DUP_ENTRY.code).json(Status.ER_DUP_ENTRY);
    }

    async put(request: Request, response: Response): Promise<Response> {
        const roomData = request.body;
        
        if(roomData){
            const hasInserted = await this.roomInteractor.update(
                roomData.number,
                roomData.photo,
                roomData.status,
                roomData.accommodation
            );

            if(hasInserted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }
    
    async delete(request: Request, response: Response): Promise<Response> {
        const roomNumber = request.body.number as number;

        if(roomNumber){
            const hasDeleted = await this.roomInteractor.delete(roomNumber);

            if(hasDeleted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }
}

export default RoomRouter;