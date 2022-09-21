import { Request, Response } from "express";
import EmployeeInteractor from "../Interactors/EmployeeInteractor";
import Database from "../Modules/Database";
import Http from "../Modules/Http";
import HttpStatus from "../Modules/HttpStatus";
import Router from "./Router";

class EmployeeRouter implements Router {
    private employeeInteractor: EmployeeInteractor;

    constructor(database: Database) {
        this.employeeInteractor = new EmployeeInteractor(database);
    }

    private validateInsertFields(body: any): boolean {
        return body.name && body.password && body.turn && body.roleId;
    }

    private validateUpdateFields(body: any): boolean {
        return this.validateInsertFields(body) && body.id;
    }

    async get(request: Request, response: Response) {
        if(request.params.id == "*"){
            const employeeList = await this.employeeInteractor.find("nome", "%");

            if(employeeList.length > 0){
                Http.sendResponse(response, HttpStatus.OK, employeeList);
            }
            else{
                Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Sem funcionários cadastrados"});
            }
        }
        else{
            const id = parseInt(request.params.id);

            if(id){
                const employeeData = await this.employeeInteractor.findByPk(id);

                if(employeeData){
                    Http.sendResponse(response, HttpStatus.OK, employeeData);
                }
                else{
                    Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Sem funcionários cadastrados"});
                }
            }
        }        
    }
    
    async post(request: Request, response: Response) {
        if(request.body){
            if(this.validateInsertFields(request.body)){
                const employeeData = request.body;
    
                try{
                    const insertedId = await this.employeeInteractor.insert(
                        employeeData.name,
                        employeeData.password,
                        employeeData.turn,
                        employeeData.roleId
                    );
                    
                    Http.sendResponse(response, HttpStatus.CREATED, insertedId);
                }
                catch(error){
                    if(error.code == "ER_DUP_ENTRY"){
                        Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "Nome já existe"});
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
                const employeeData = request.body;
    
                try{
                    const  hasUpdated = await this.employeeInteractor.update(
                        employeeData.id,
                        employeeData.name,
                        employeeData.password,
                        employeeData.turn,
                        employeeData.roleId
                    );
                    if(hasUpdated){
                        Http.sendResponse(response, HttpStatus.NO_CONTENT);
                    }
                    else{
                        Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Funcionário não encontrado"});
                    }
                }
                catch(error){
                    Http.sendResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, {message: "Nome já existe"});
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
        const employeeId = parseInt(request.params.id);
        
        if(employeeId){
            try{
                const hasDeleted = await this.employeeInteractor.delete(employeeId);
                if(hasDeleted){
                    Http.sendResponse(response, HttpStatus.NO_CONTENT);
                }
                else{
                    Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Funcionário não encontrado"});
                }
            }
            catch(error){
                Http.sendResponse(response, HttpStatus.NOT_FOUND, {message: "Funcionário não encontrado"});
            }
        }
        else{
            Http.sendResponse(response, HttpStatus.BAD_REQUEST);
        }
    }    
}

export default EmployeeRouter;