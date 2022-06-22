import { Request, Response } from "express";
import Status from "../Entity/Status";
import AccommodationInteractor from "../Interactor/AccommodationInteractor";
import Database from "../Interactor/Database";
import Router from "./Router";

/**
 * Router responsável por receber todas as requisições
 * vindo da rota accommodation e encaminhar os dados para camada
 * Interactor.
 * 
 * Consulte a interface Router para saber mais sobre
 * cada um dos métodos.
 * 
 * @author Herik Aparecida
 */
class AccommodationRouter implements Router {
    private accommodationInteractor : AccommodationInteractor;

    constructor(database: Database) {
        this.accommodationInteractor = new AccommodationInteractor(database);
    }

    async get(request: Request, response: Response): Promise<Response> {
        const accommodationId = request.body.id as number;

        if(accommodationId){
            const accommodation = await this.accommodationInteractor.findByPk(accommodationId);
            if(accommodation){
                return response.status(Status.OK.code).json(accommodation);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async post(request: Request, response: Response): Promise<Response> {
        const accommodationData = request.body;

        if(accommodationData){
            const hasInserted = await this.accommodationInteractor.insert(
                accommodationData.description,
                accommodationData.dailyPrice
            );

            if(hasInserted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }
    }

    async put(request: Request, response: Response): Promise<Response> {
        const accommodationData = request.body;

        if(accommodationData){
            const hasUpdated = await this.accommodationInteractor.update(
                accommodationData.id,
                accommodationData.description,
                accommodationData.dailyPrice
            );

            if(hasUpdated){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }
    
    async delete(request: Request, response: Response): Promise<Response> {
        const accommodationId = request.body.id as number;

        if(accommodationId){
            const hasDeleted = await this.accommodationInteractor.delete(accommodationId);

            if(hasDeleted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

}

export default AccommodationRouter;