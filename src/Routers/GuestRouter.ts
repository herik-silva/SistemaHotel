import { Request, Response } from "express";
import GuestInteractor from "../Interactors/GuestInteractor";
import Database from "../Modules/Database";
import Http from "../Modules/Http";
import HttpStatus from "../Modules/HttpStatus";
import Router from "./Router";

class GuestRouter implements Router {
    private guestInteractor: GuestInteractor;

    constructor(database: Database) {
        this.guestInteractor = new GuestInteractor(database);
    }

    private validateInsertFields(body: any): boolean {
        return body.name && body.CPF && body.contactPhone && body.sex && body.city;
    }

    private validateUpdateFields(body: any): boolean {
        return this.validateInsertFields(body) && body.lastAccommodationId && body.id;
    }

    async get(request: Request, response: Response) {
        if(request.params.id == "*"){
            const guestList = await this.guestInteractor.find("nome", "%");

            if(guestList.length > 0){
                Http.sendResponse(response, HttpStatus.OK, guestList);
            }
            else{
                Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Sem hospedes cadastrados"});
            }
        }
        else{
            const id = parseInt(request.params.id);

            if(id){
                const guestData = await this.guestInteractor.findByPk(id);

                if(guestData){
                    Http.sendResponse(response, HttpStatus.OK, guestData);
                }
                else{
                    Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Hospede não encontrado"});
                }
            }
        }        
    }
    
    async post(request: Request, response: Response) {
        if(request.body){
            if(this.validateInsertFields(request.body)){
                const guestData = request.body;
    
                try{
                    const insertedId = await this.guestInteractor.insert(
                        guestData.name,
                        guestData.CPF,
                        guestData.contactPhone,
                        guestData.sex,
                        guestData.city
                    );
                    
                    Http.sendResponse(response, HttpStatus.CREATED, insertedId);
                }
                catch(error){
                    console.log(error);
                    if(error.code == "ER_DUP_ENTRY"){
                        Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "CPF já existe"});
                    }
                }
            }
            else{
                Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Verifique os campos enviados"});
            }
            
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. O corpo da requisição esta vazia"});
        }
    }
    
    async put(request: Request, response: Response) {
        if(request.body){
            if(this.validateUpdateFields(request.body)){
                const guestData = request.body;
    
                try{
                    await this.guestInteractor.update(
                        guestData.id,
                        guestData.name,
                        guestData.CPF,
                        guestData.contactPhone,
                        guestData.sex,
                        guestData.city,
                        guestData.lastAccommodationId
                    );
    
                    Http.sendResponse(response, HttpStatus.NO_CONTENT);
                }
                catch(error){
                    Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "CPF já existe"});
                }
            }
            else{
                Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Verifique os campos enviados"});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. O corpo da requisição esta vazia"});
        }
    }
    
    async delete(request: Request, response: Response) {
        const guestId = parseInt(request.params.id);
        
        if(guestId){
            try{
                const hasDeleted = await this.guestInteractor.delete(guestId);

                if(hasDeleted){
                    Http.sendResponse(response, HttpStatus.NO_CONTENT);
                }
                
                Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Hospede não encontrado"});
            }
            catch(error){
                console.log(error);
                Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Hospede não encontrado"});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. O ID deve ser um número"});
        }
    }
}

export default GuestRouter;