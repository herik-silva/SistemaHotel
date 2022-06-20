import { Request, Response } from "express";
import Employee from "../Entity/Employee";
import Status from "../Entity/Status";
import Database from "../Interactor/Database";
import EmployeeInteractor from "../Interactor/EmployeeInteractor";
import Router from "./Router";

class EmployeeRouter implements Router {
    private employeeInteractor: EmployeeInteractor;

    constructor(database: Database) {
        this.employeeInteractor = new EmployeeInteractor(database);
    }

    async get(request: Request, response: Response): Promise<Response> {
        const employeeId = request.body.id as number;

        if(employeeId){
            const employee = await this.employeeInteractor.findByPk(employeeId);

            if(employee){
                return response.status(Status.OK.code).json(employee);
            }

            return response.status(Status.OK.code).json(Status.OK);
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async post(request: Request, response: Response): Promise<Response> {
        const employeeData = request.body;    

        const hasInserted = await this.employeeInteractor.insert(
            employeeData.name,
            employeeData.cpf,
            employeeData.password,
            employeeData.photo,
            employeeData.turn,
            employeeData.contactPhone,
            employeeData.salary,
            employeeData.responsabilityId
        );

        if(hasInserted){
            return response.status(Status.OK.code).json(Status.OK);
        }

        return response.status(Status.ER_DUP_ENTRY.code).json(Status.ER_DUP_ENTRY);
    }

    async put(request: Request, response: Response): Promise<Response> {
        const employeeData = request.body;

        const hasUpdated = await this.employeeInteractor.update(
            employeeData.id,
            employeeData.name,
            employeeData.cpf,
            employeeData.password,
            employeeData.photo,
            employeeData.turn,
            employeeData.contactPhone,
            employeeData.salary,
            employeeData.responsabilityId
        );

        if(hasUpdated){
            return response.status(Status.OK.code).json(Status.OK);
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const employeeId = request.body.id as number;

        if(employeeId){
            const hasDeleted = await this.employeeInteractor.delete(employeeId);
            
            if(hasDeleted){
                return response.status(Status.OK.code).json(Status.OK);
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }
}

export default EmployeeRouter;