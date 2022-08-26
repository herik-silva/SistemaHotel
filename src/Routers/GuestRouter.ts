import { Request, Response } from "express";
import Status from "../Entity/Status";
import Database from "../Interactor/Database";
import GuestInteractor from "../Interactor/GuestInteractor";
import Router from "./Router";

/**
 * Router responsável por receber todas as requisições
 * vindo da rota guest e encaminhar os dados para camada
 * Interactor.
 * 
 * Consulte a interface Router para saber mais sobre
 * cada um dos métodos.
 * 
 * @author Herik Aparecida
 */
class GuestRouter implements Router {
    private guestInteractor: GuestInteractor;

    constructor(database: Database){
        this.guestInteractor = new GuestInteractor(database)
    }

    async get(request: Request, response: Response) {
        const guestId = parseInt(request.params.id);

        if(guestId){
            const guest = await this.guestInteractor.findByPk(guestId);
    
            if(guest){
                return response.status(Status.OK.code).json(guest);
            }
        }
        else {
            const guestList = await this.guestInteractor.find("name", "%");
            if(guestList){
                console.log("\n\n\BUSCANDO\n");
                console.log(guestList);

                return response.status(Status.OK.code).json(guestList);
            }
        }
        
        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async post(request: Request, response: Response) {
        console.log("INSERIR GUEST");
        const guestData = request.body;
        console.log(guestData);
        const insertedId = await this.guestInteractor.insert(
            guestData.name,
            guestData.cpf,
            guestData.photo,
            guestData.contactPhone,
            guestData.city,
            guestData.companyId
        )

        if(insertedId){
            return response.status(Status.OK.code).json({lastId: insertedId});
        }
    }

    async put(request: Request, response: Response) {
        const guestData = request.body;
        console.log("\n\n\nATUALIZANDO\n");
        console.log(guestData);
        const hasUpdated = await this.guestInteractor.update(
            guestData.id,
            guestData.name,
            guestData.cpf,
            guestData.photo,
            guestData.contactPhone,
            guestData.city,
            guestData.companyId,
            guestData.lastAcommodationId
        );

        if(hasUpdated){
            return response.status(Status.OK.code).json(Status.OK);
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async delete(request: Request, response: Response) {
        const guestId = parseInt(request.body.id);

        const hasDeleted = await this.guestInteractor.delete(guestId);

        if(hasDeleted){
            return response.status(Status.OK.code).json(Status.OK);
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }
}

export default GuestRouter