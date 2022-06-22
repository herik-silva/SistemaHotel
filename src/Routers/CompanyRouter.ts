import { Request, Response } from "express";
import Status from "../Entity/Status";
import CompanyInteractor from "../Interactor/CompanyInteractor";
import Database from "../Interactor/Database";
import Router from "./Router";

/**
 * Router responsável por receber todas as requisições
 * vindo da rota company e encaminhar os dados para camada
 * Interactor.
 * 
 * Consulte a interface Router para saber mais sobre
 * cada um dos métodos.
 * 
 * @author Herik Aparecida
 */
class CompanyRouter implements Router {
    private companyInteractor: CompanyInteractor;

    constructor(database: Database) {
        this.companyInteractor = new CompanyInteractor(database);
    }

    async get(request: Request, response: Response): Promise<Response> {
        const companyId = request.body.id as number;

        if(companyId){
            const company = await this.companyInteractor.findByPk(companyId);

            if(company){
                return response.status(Status.OK.code).json(company);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async post(request: Request, response: Response): Promise<Response> {
        const companyData = request.body;

        if(companyData){
            const hasInserted = await this.companyInteractor.insert(
                companyData.cnpj,
                companyData.email,
                companyData.name,
                companyData.contactPhone
            );

            if(hasInserted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.ER_DUP_ENTRY.code).json(Status.ER_DUP_ENTRY);
    }

    async put(request: Request, response: Response): Promise<Response> {
        const companyData = request.body;

        if(companyData){
            const hasUpdated = await this.companyInteractor.update(
                companyData.id,
                companyData.cnpj,
                companyData.email,
                companyData.name,
                companyData.contactPhone
            );

            if(hasUpdated){
                return response.status(Status.OK.code).json(Status.OK);
            }

            return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
        }
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const companyId = request.body.id as number;

        if(companyId){
            const hasDeleted = await this.companyInteractor.delete(companyId);

            if(hasDeleted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }
}

export default CompanyRouter;