import { Request, Response } from "express";
import RoleInteractor from "../Interactors/RoleInteractor";
import Database from "../Modules/Database";
import Http from "../Modules/Http";
import HttpStatus from "../Modules/HttpStatus";
import Router from "./Router";

class RoleRouter implements Router {
    private roleInteractor: RoleInteractor;
    
    constructor(database: Database){
        this.roleInteractor = new RoleInteractor(database);
    }

    private validateFields(body: any): boolean {
        return body.name && body.accessLevel;
    }

    async get(request: Request, response: Response) {
        if(request.params.id){
            if(request.params.id == "*"){
                const roleList = await this.roleInteractor.find("%");
    
                if(roleList.length > 0){
                    Http.sendResponse(response, HttpStatus.OK, roleList);
                }
                else{
                    Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Sem cargos cadastrados"});
                }
            }
            else{
                const id = parseInt(request.params.id);
                if(id){
                    const role = await this.roleInteractor.findByPk(id);
    
                    if(role){
                        Http.sendResponse(response, HttpStatus.OK, role);
                    }
                    else{
                        Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Cargo não encontrada"});
                    }
                }
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. No parâmetro ID deve conter apenas números ou asterísco(*)"});
        }
    }

    async post(request: Request, response: Response) {
        if(request.body){
            const validatedFields = this.validateFields(request.body);

            if(validatedFields){
                const roleData = request.body;
                const lastId = await this.roleInteractor.insert(roleData.name, roleData.accessLevel);
                
                Http.sendResponse(response, HttpStatus.CREATED, lastId);
            }
            else{
                Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Campos inválidos. Verifique os campos que são enviados."});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. O corpo da requisição está vazia"});
        }
    }
    
    async put(request: Request, response: Response) {
        if(request.body){
            const validatedFields = this.validateFields(request.body) && request.body.id;

            if(validatedFields){
                const roleData = request.body;
                const hasUpdated = await this.roleInteractor.update(
                    roleData.id,
                    roleData.name,
                    roleData.accessLevel
                );
                
                if(hasUpdated){
                    Http.sendResponse(response, HttpStatus.NO_CONTENT);
                }
                else{
                    Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Cargo não encontrada. ID inválido"});
                }
            }
            else{
                Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Campos inválidos. Verifique os campos que são enviados."});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. O corpo da requisição está vazia"});
        }
    }

    async delete(request: Request, response: Response) {
        if(request.params.id){
            try{
                const id = parseInt(request.params.id);
                
                if(id){
                    const hasDeleted = await this.roleInteractor.delete(id);

                    if(hasDeleted){
                        Http.sendResponse(response, HttpStatus.NO_CONTENT);
                    }
                    else{
                        Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Cargo não encontrado"});    
                    }
                }
                else{
                    Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. No parâmetro ID deve conter apenas números."});
                }
            }
            catch(error){
                console.log(error);
                Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "O parâmero ID deve ser um número inteiro"});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST, {message: "Requisição inválida. Parâmetro vazio."});
        }
    }
}

export default RoleRouter;