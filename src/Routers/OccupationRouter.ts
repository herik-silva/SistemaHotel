import { Request, Response } from "express";
import OccupationInteractor from "../Interactors/OccupationInteractor";
import Database from "../Modules/Database";
import Router from "./Router";

class OccupationRouter implements Router {
    private occupationInteractor: OccupationInteractor;

    constructor(database: Database) {
        this.occupationInteractor = new OccupationInteractor(database);
    }

    private validateInsertFields(body: any): boolean {
        return (
            body.reserveId && body.initDate
            && body.endDate && body.guestId
            && body.employeeId && body.amountPeoples
            && body.observations
        );
    }

    private validateUpdateFields(body: any): boolean {
        return (
            body.reserveId && body.initDate
            && body.endDate && body.guestId
            && body.employeeId && body.amountPeoples
            && body.observations && body.id
            && body.lastCheckin && body.amountCheckin
        );
    }
    async get(request: Request, response: Response): Promise<Response> {
        if(request.params.id == "*"){
            try{
                const occupationDataList = await this.occupationInteractor.find("nome_hospede", "%");
    
                if(occupationDataList.length > 0){
                    return response.status(200).send(occupationDataList);
                }
    
                return response.status(404).send({message: "Nenhuma ocupação encontrada"});
            }
            catch(error){
                console.log("/n/n----------\nERRO AO BUSCAR");
                console.log(error);
                console.log("----------/n/n");
            }
        }
        else{
            try{
                const id = parseInt(request.params.id);
                const occupation = await this.occupationInteractor.findByPk(id);
                
                return response.status(200).send(occupation);
            }
            catch(error){
                console.log("/n/n----------\nERRO AO BUSCAR");
                console.log(error);
                console.log("----------/n/n");
            }
        }
    }

    async post(request: Request, response: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    async put(request: Request, response: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }

    async delete(request: Request, response: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }


}

export default OccupationRouter;