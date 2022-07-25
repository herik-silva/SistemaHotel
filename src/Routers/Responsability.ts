import { Request, Response } from "express";
import Status from "../Entity/Status";
import Database from "../Interactor/Database";
import ResponsabilityInteractor from "../Interactor/ResponsabilityInteractor";
import Router from "./Router";

/**
 * Router responsável por receber todas as requisições
 * vindo da rota responsability e encaminhar os dados para camada
 * Interactor.
 * 
 * Consulte a interface Router para saber mais sobre
 * cada um dos métodos.
 * 
 * @author Herik Aparecida
 */
class ResponsabilityRouter implements Router {
    private responsabilityInteractor: ResponsabilityInteractor;

    constructor(database: Database) {
        this.responsabilityInteractor = new ResponsabilityInteractor(database);
    }

    async get(request: Request, response: Response): Promise<Response> {
        const responsabilityId = parseInt(request.params.id);

        if(responsabilityId){
            const responsability = await this.responsabilityInteractor.findByPk(responsabilityId);

            if(responsability){
                return response.status(Status.OK.code).json(responsability);
            }
        }
        else{
            console.log("Todos");
            const responsabilityList = await this.responsabilityInteractor.find("%");
            if(responsabilityList && responsabilityList.length>0){
                return response.status(Status.OK.code).json(responsabilityList);
            }
        }


        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async post(request: Request, response: Response): Promise<Response> {
        const responsabilityData = request.body;

        if(responsabilityData){
            const hasInserted = await this.responsabilityInteractor.insert(
                responsabilityData.name,
                responsabilityData.acessLevel
            );

            if(hasInserted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.ER_DUP_ENTRY.code).json(Status.ER_DUP_ENTRY);
    }

    async put(request: Request, response: Response): Promise<Response> {
        const responsabilityData = request.body;

        if(responsabilityData){
            const hasInserted = await this.responsabilityInteractor.update(
                responsabilityData.id,
                responsabilityData.name,
                responsabilityData.acessLevel
            );

            if(hasInserted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const responsabilityId = request.body.id as number;

        if(responsabilityId){
            const hasDeleted = await this.responsabilityInteractor.delete(responsabilityId);

            if(hasDeleted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }
}

export default ResponsabilityRouter;