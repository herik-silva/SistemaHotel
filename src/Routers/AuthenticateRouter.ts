import { Request, Response } from "express";
import Status from "../Entity/Status";
import Database from "../Interactor/Database";
import EmployeeInteractor from "../Interactor/EmployeeInteractor";
import Router from "./Router";

type AuthenticateData = {name: string, password: string};

class AuthenticateRouter implements Router {
    private employeeInteractor: EmployeeInteractor;

    constructor(database: Database) {
        this.employeeInteractor = new EmployeeInteractor(database);
    }

    /**
     * 
     * @deprecated
     *  
     */
    get(request: any, response: any) {
        throw new Error("Method not implemented.");
    }
    
    async post(request: Request, response: Response) {
        const authB64 = request.headers.authorization; // Basic *
        console.log(authB64)
        if(authB64){
            const auth = atob(authB64.split(" ")[1]);
            console.log(auth);
            console.log("Autenticado")
            if(auth){
                const user = await this.employeeInteractor.authenticate(auth);
    
                if(user){
                    return response.status(Status.OK.code).json(user);
                }
            }
        }

        return response.status(Status.NOT_FOUND.code).json(Status.NOT_FOUND);
    }
 
    /**
     * @deprecated 
     */
    put(request: any, response: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * @deprecated 
     */
    delete(request: any, response: any) {
        throw new Error("Method not implemented.");
    }

}

export default AuthenticateRouter;