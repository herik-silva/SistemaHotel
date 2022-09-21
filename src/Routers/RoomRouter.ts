import e, { Request, Response } from "express";
import RoomInteractor from "../Interactors/RoomInteractor";
import Database from "../Modules/Database";
import Http from "../Modules/Http";
import HttpStatus from "../Modules/HttpStatus";
import Router from "./Router";

class RoomRouter implements Router {
    private roomInteractor: RoomInteractor;

    constructor(database: Database) {
        this.roomInteractor = new RoomInteractor(database);
    }

    private validateInsertFields(body: any): boolean {
        return body.number && body.accommodationId && body.image;
    }

    private validateUpdateFields(body: any): boolean {
        return this.validateInsertFields(body) && body.id && body.status;
    }

    async get(request: Request, response: Response) {
        if(request.params.id == "*"){
            try{
                const roomList = await this.roomInteractor.find("number","%");
                
                if(roomList.length > 0)
                    Http.sendResponse(response, HttpStatus.OK, roomList);
                else
                    Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Nenhum quarto encontrado"});
            }
            catch(error){
                Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "Aconteceu um erro inesperado"});
            }
        }
        else{
            const id = parseInt(request.params.id);

            try{
                const room = await this.roomInteractor.findByPk(id);
                Http.sendResponse(response, HttpStatus.OK, room);
            }
            catch(error){
                Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Quarto não encontrado"})
            }
        }
    }
    
    async post(request: Request, response: Response) {
        if(request.body){
            console.log(request.body);
            if(this.validateInsertFields(request.body)){
                const roomData = request.body;
    
                try{
                    const insertedId = await this.roomInteractor.insert(
                        roomData.number,
                        roomData.accommodationId,
                        roomData.image
                    );
    
                    Http.sendResponse(response, HttpStatus.CREATED, {message: "Quarto inserido", insertedId});
                }
                catch(error){
                    if(error.code == "ER_DUP_ENTRY"){
                        Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "Já existe um quarto com esse número"});
                    }
    
                    Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "O servidor não conseguiu responder"});
                }
            }
            else{
                Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. Verifique os campos enviados"});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. Sem conteúdo no corpo da requisição"});
        }
    }
    
    async put(request: Request, response: Response) {
        if(request.body){
            console.log(request.body);

            if(this.validateUpdateFields(request.body)){
                const roomData = request.body;
                console.log("Entrou");
                try{
                    await this.roomInteractor.update(
                        roomData.id,
                        roomData.number,
                        roomData.status,
                        roomData.accommodationId,
                        roomData.image
                    );
    
                    Http.sendResponse(response, HttpStatus.NO_CONTENT);
                }
                catch(error){
                    if(error.code == "ER_DUP_ENTRY"){
                        Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "Já existe um quarto com esse número"});
                    }
                    
                    Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Quarto não encontrado"});
                }
            }
            else{
                Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. Verifique os campos enviados"});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. Sem conteúdo no corpo da requisição"});
        }
    }
    
    async delete(request: Request, response: Response) {
        if(request.params.id){
            const id = parseInt(request.params.id);

            try{
                await this.roomInteractor.delete(id);

                Http.sendResponse(response, HttpStatus.NO_CONTENT);
            }
            catch(error){
                Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Quarto não encontrado!"});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. Necessário informar o ID para exclusão"});
        }
    }

}

export default RoomRouter;