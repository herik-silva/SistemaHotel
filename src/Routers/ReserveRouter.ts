import { Request, Response } from "express";
import Status from "../Entity/Status";
import Database from "../Interactor/Database";
import ReserveInteractor from "../Interactor/ReserveInteractor";
import Router from "./Router";

/**
 * Router responsável por receber todas as requisições
 * vindo da rota reserve e encaminhar os dados para camada
 * Interactor.
 * 
 * Consulte a interface Router para saber mais sobre
 * cada um dos métodos.
 * 
 * @author Herik Aparecida
 */
class ReserveRouter implements Router {
    private reserveInteractor: ReserveInteractor;

    constructor(database: Database) {
        this.reserveInteractor = new ReserveInteractor(database);
    }
    
    async get(request: Request, response: Response): Promise<Response> {
        const reserveId = parseInt(request.params.id);

        if(reserveId){
            const reserve = await this.reserveInteractor.findByPk(reserveId);

            if(reserve){
                return response.status(Status.OK.code).json(reserve);
            }
        }
        else {
            const reserveList = await this.reserveInteractor.find("id", "%");

            if(reserveList){
                console.log(reserveList);
                return response.status(Status.OK.code).json(reserveList);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async post(request: Request, response: Response): Promise<Response> {
        const reserveData = request.body;
        if(reserveData){
            const reserveId = await this.reserveInteractor.insert(
                    reserveData.entryDate,
                    reserveData.checkoutDate,
                    reserveData.amountPeople,
                    reserveData.roomId,
                    reserveData.guestId,
                    reserveData.employeeId,
                    reserveData.status,
                    reserveData.checkInAmount,
                    reserveData.observation,
                    reserveData.payment
            );

            if(reserveId){
                return response.status(Status.OK.code).json({id: reserveId});
            }
        }

        return response.status(Status.ER_DUP_ENTRY.code).json(Status.ER_DUP_ENTRY);
    }

    async put(request: Request, response: Response): Promise<Response> {
        const UPDATE = "update";
        const CHECKIN = "checkin";
        const reserveData = request.body;
        const option = request.params.option;
        console.log(reserveData);
        if(reserveData && option == UPDATE){
            const hasUpdated = await this.reserveInteractor.update(
                reserveData.id,
                reserveData.entryDate,
                reserveData.checkoutDate,
                reserveData.amountPeople,
                reserveData.roomId,
                reserveData.guestId,
                reserveData.employeeId,
                reserveData.status,
                reserveData.checkinAmount,
                reserveData.payment,
                reserveData.observation
            )

            if(hasUpdated){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }
        
        if(reserveData && option == CHECKIN){
            console.log("Checkin");
            const makedCheckin = await this.reserveInteractor.makeCheckin(reserveData.id, reserveData.status, reserveData.checkinAmount, reserveData.lastCheckin);
            if(makedCheckin){
                console.log("BOTOU")
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const reserveId = request.body.id as number;

        if(reserveId){
            const hasDeleted = await this.reserveInteractor.delete(reserveId);

            if(hasDeleted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }
}

export default ReserveRouter;