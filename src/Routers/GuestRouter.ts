import { Request, Response } from "express";
import GuestInteractor from "../Interactors/GuestInteractor";
import Database from "../Modules/Database";
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

    async get(request: Request, response: Response): Promise<Response> {
        if(request.params.id == "*"){
            const guestList = await this.guestInteractor.find("nome", "%");

            if(guestList.length > 0){
                return response.status(HttpStatus.OK).send(guestList);
            }

            return response.status(HttpStatus.NOT_FOUND).send({message: "Sem hospedes cadastrados"});
        }
        else{
            const id = parseInt(request.params.id);

            if(id){
                const guestData = await this.guestInteractor.findByPk(id);

                if(guestData){
                    return response.status(HttpStatus.OK).send(guestData);
                }

                return response.status(HttpStatus.NOT_FOUND).send({message: "Hospede não encontrado"});
            }
        }        
    }
    
    async post(request: Request, response: Response): Promise<Response> {
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
                    
                    return response.status(HttpStatus.CREATED).send(insertedId);
                }
                catch(error){
                    console.log(error);
                    if(error.code == "ER_DUP_ENTRY"){
                        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "CPF já existe"});
    
                    }
                }
            }
            else{
                return response.status(HttpStatus.BAD_REQUEST).send({message: "Verifique os campos enviados"});
            }
            
        }
        
        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. O corpo da requisição esta vazia"});
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
    
                    return response.status(204).send();
                }
                catch(error){
                    return response.status(500).send({message: "CPF já existe"});
                }
            }
            else{
                return response.status(HttpStatus.BAD_REQUEST).send({message: "Verifique os campos enviados"});
            }
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. O corpo da requisição esta vazia"});
    }
    
    async delete(request: Request, response: Response) {
        const guestId = parseInt(request.params.id);
        
        if(guestId){
            try{
                const hasDeleted = await this.guestInteractor.delete(guestId);

                if(hasDeleted){
                    return response.status(204).send();
                }
                
                return response.status(HttpStatus.NOT_FOUND).send({message: "Hospede não encontrado"}).send();
            }
            catch(error){
                console.log(error);
                return response.status(HttpStatus.NOT_FOUND).send({message: "Hospede não encontrado"}).send();
            }
        }

        return response.status(HttpStatus.BAD_REQUEST).send();
    }
    
}

export default GuestRouter;