import { Request, Response } from "express";
import OccupationInteractor from "../Interactors/OccupationInteractor";
import Database from "../Modules/Database";
import Http from "../Modules/Http";
import HttpStatus from "../Modules/HttpStatus";
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
    async get(request: Request, response: Response) {
        if(request.params.id == "*"){
            try{
                const occupationDataList = await this.occupationInteractor.find("nome_hospede", "%");
    
                if(occupationDataList.length > 0)
                    Http.sendResponse(response, HttpStatus.OK, occupationDataList);
                else
                    Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Nenhuma ocupação encontrada"});
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
                
                Http.sendResponse(response, HttpStatus.OK, occupation);
            }
            catch(error){
                Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. O ID deve ser um número inteiro."});
                console.log("/n/n----------\nERRO AO BUSCAR");
                console.log(error);
                console.log("----------/n/n");
            }
        }
    }

    async post(request: Request, response: Response) {
        if(request.body){
            if(this.validateInsertFields(request.body)){
                const occupationData = request.body;
                try{
                    const insertedId = await this.occupationInteractor.insert(
                        occupationData.reserveId,
                        occupationData.initDate,
                        occupationData.endDate,
                        occupationData.guestId,
                        occupationData.employeeId,
                        occupationData.amountPeople,
                        occupationData.observations
                    );
                    
                    Http.sendResponse(response, HttpStatus.CREATED, insertedId);
                }
                catch(error){
                    console.log(error);
                    Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "Ocorreu um erro inesperado ao inserir uma ocupação"});
                }
            }
            else{
                Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. Verifique o nome dos campos enviados"});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. O corpo da requisição está vazia."});
        }
    }

    async put(request: Request, response: Response) {
        if(request.body){
            if(this.validateUpdateFields(request.body)){
                const occupationData = request.body;
                try{
                    const hasUpdated = await this.occupationInteractor.update(
                        occupationData.id,
                        occupationData.reserveId,
                        occupationData.initDate,
                        occupationData.endDate,
                        occupationData.guestId,
                        occupationData.amountPeople,
                        occupationData.observations,
                        occupationData.lastCheckin,
                        occupationData.amountCheckin
                    );
    
                    if(hasUpdated)
                        Http.sendResponse(response, HttpStatus.NO_CONTENT);
                    else
                        Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Ocupação não encontrada."});
                }
                catch(error){
                    Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "Aconteceu um erro inesperado."});
                }
            }
            else{
                Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. Verifique o nome dos campos enviados"});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. O corpo da requisição está vazia."});
        }
    }

    async delete(request: Request, response: Response) {
        const id = parseInt(request.params.id);

        if(id){
            const hasDeleted = await this.occupationInteractor.delete(id);

            if(hasDeleted)
                Http.sendResponse(response, HttpStatus.NO_CONTENT);
            else
                Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "Ocupação não encontrada."});
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. O ID deve ser um número inteiro."});
        }
    }
}

export default OccupationRouter;