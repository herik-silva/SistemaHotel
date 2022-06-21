import { Request, Response } from "express";
import Status from "../Entity/Status";
import CompanyInteractor from "../Interactor/CompanyInteractor";
import Database from "../Interactor/Database";
import Router from "./Router";

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

    post(request: any, response: any) {
        throw new Error("Method not implemented.");
    }
    put(request: any, response: any) {
        throw new Error("Method not implemented.");
    }
    delete(request: any, response: any) {
        throw new Error("Method not implemented.");
    }

}

export default CompanyRouter;