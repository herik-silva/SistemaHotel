import { Request, Response } from "express";
import Database from "../Interactor/Database";
import GuestInteractor from "../Interactor/GuestInteractor";
import Router from "./Router";

/**
 * Router responsável por receber todas as requisições
 * vindo da rota guest.
 * 
 * @author Herik Aparecida
 */
class GuestRouter implements Router {
    private guestInteractor: GuestInteractor;

    constructor(database: Database){
        this.guestInteractor = new GuestInteractor(database)
    }

    async get(request: Request, response: Response) {
        const guestId = parseInt(request.body.id);
        const guest = await this.guestInteractor.findByPk(guestId);
        const jsonError = {error: "Hospede não encontrado!"};

        if(guest){
            return response.json(guest);
        }
        
        return response.json(jsonError);
    }

    post(request: Request, response: Response) {
        const guestData = request.body;
        console.log(guestData);

        const hasInserted = this.guestInteractor.insert(
            0,
            guestData.name,
            guestData.cpf,
            guestData.photo,
            guestData.contactPhone,
            guestData.city,
            guestData.companyId,
            undefined
        )

        if(hasInserted){
            return response.status(200).json({status: 200});
        }
    }

    put(request: Request, response: Response) {
        throw new Error("Method not implemented.");
    }

    delete(request: Request, response: Response) {
        throw new Error("Method not implemented.");
    }
}

export default GuestRouter