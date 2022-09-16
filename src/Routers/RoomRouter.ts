import { Request, Response } from "express";
import RoomInteractor from "../Interactors/RoomInteractor";
import Database from "../Modules/Database";
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

    async get(request: Request, response: Response): Promise<Response> {
        if(request.params.id == "*"){
            try{
                const roomList = await this.roomInteractor.find("number","%");
                
                if(roomList.length > 0){
                    return response.status(HttpStatus.OK).send(roomList);
                }
                
                return response.status(HttpStatus.NOT_FOUND).send({message: "Nenhum quarto encontrado"});
            }
            catch(error){
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Aconteceu um erro inesperado"});
            }
        }
        else{
            const id = parseInt(request.params.id);

            try{
                const room = await this.roomInteractor.findByPk(id);
                return response.status(HttpStatus.OK).send(room);
            }
            catch(error){
                return response.status(HttpStatus.NOT_FOUND).send({message: "Quarto não encontrado"})
            }
        }
    }
    
    async post(request: Request, response: Response): Promise<Response> {
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
    
                    return response.status(HttpStatus.CREATED).send({message: "Quarto inserido", insertedId});
                }
                catch(error){
                    if(error.code == "ER_DUP_ENTRY"){
                        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Já existe um quarto com esse número"});
                    }
    
                    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "O servidor não conseguiu responder"});
                }
            }

            return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. Verifique os campos enviados"});
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. Sem conteúdo no corpo da requisição"});
    }
    
    async put(request: Request, response: Response): Promise<Response> {
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
    
                    return response.status(HttpStatus.NO_CONTENT).send();
                }
                catch(error){
                    if(error.code == "ER_DUP_ENTRY"){
                        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Já existe um quarto com esse número"});
                    }
                    
                    return response.status(HttpStatus.NOT_FOUND).send({message: "Quarto não encontrado"});
                }
            }

            return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. Verifique os campos enviados"});
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. Sem conteúdo no corpo da requisição"});
    }
    
    async delete(request: Request, response: Response): Promise<Response> {
        if(request.params.id){
            const id = parseInt(request.params.id);

            try{
                await this.roomInteractor.delete(id);

                return response.status(HttpStatus.NO_CONTENT).send();
            }
            catch(error){
                return response.status(HttpStatus.NOT_FOUND).send({message: "Quarto não encontrado!"});
            }
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. Necessário informar o ID para exclusão"});
    }

}

export default RoomRouter;