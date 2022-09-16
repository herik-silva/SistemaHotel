import { Request, Response } from "express";
import ReserveInteractor from "../Interactors/ReserveInteractor";
import Database from "../Modules/Database";
import HttpStatus from "../Modules/HttpStatus";
import Router from "./Router";

class ReserveRouter implements Router {
    private reserveInteractor: ReserveInteractor;

    constructor(database: Database) {
        this.reserveInteractor = new ReserveInteractor(database);
    }

    private validateFields(body: any): boolean {
        return body.guestName && body.contactPhone && body.roomId;
    }

    async get(request: Request, response: Response): Promise<Response> {
        if(request.params.id == "*"){
            try{
                console.log("Consultar");
                const reserveList = await this.reserveInteractor.find("nome_hospede", "%");
                
                if(reserveList.length > 0){
                    return response.status(HttpStatus.OK).send(reserveList);

                }

                return response.status(HttpStatus.NOT_FOUND).send({message: "Sem reservas cadastradas"});
            }
            catch(error){
                console.log("-------------/nErro ao Buscar");
                console.log(error);
                console.log("--------------------/n/n");
            }
        }
        else{
            try{
                const id = parseInt(request.params.id);
                const reserve = await this.reserveInteractor.findByPk(id);
                
                if(reserve){
                    return response.status(HttpStatus.OK).send(reserve);
                }

                return response.status(HttpStatus.NOT_FOUND).send({message: "Reserva não encontrada"});
            }
            catch(error){
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Erro inesperado"});
            }
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. Parâmetro vazio"});
    }
    
    async post(request: Request, response: Response): Promise<Response> {
        if(request.body){
            const reserveData = request.body;
            const fieldsIsOk = this.validateFields(reserveData);

            if(fieldsIsOk){
                try{
                    const insertedId = await this.reserveInteractor.insert(
                        reserveData.guestName,
                        reserveData.contactPhone,
                        reserveData.roomId
                    );
    
                    return response.sendStatus(HttpStatus.CREATED).send(insertedId);
                }
                catch(error){
                    console.log("-------------/nErro ao Inserir");
                    console.log(error);
                    console.log("--------------------/n/n");
                }
            }
            else{
                return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. Os campos no corpo da requisição são inválidos."})
            }
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. O corpo da requisição está vazia"});
    }
    
    async put(request: Request, response: Response): Promise<Response> {
        if(request.body){
            const reserveData = request.body;
            const fieldsIsOk = this.validateFields(reserveData);

            if(fieldsIsOk && reserveData.id){
                try{
                    await this.reserveInteractor.update(
                        reserveData.id,
                        reserveData.guestName,
                        reserveData.contactPhone,
                        reserveData.roomId
                    )

                    return response.status(HttpStatus.NO_CONTENT).send();
                }
                catch(error){
                    console.log(error)
                    return response.status(HttpStatus.NOT_FOUND).send({message: "Reserva não encontrada. Verifique o ID informado"});
                }
            }

            return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. Os campos no corpo da requisição são inválidos."});
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. O corpo da requisição está vazia"});
    }
    
    async delete(request: Request, response: Response): Promise<Response> {
        console.log("DELETE");
        if(request.params.id){
            const id = parseInt(request.params.id);

            try{
                console.log("TENTANDO");
                await this.reserveInteractor.delete(id);
                console.log("DELETADO");
                return response.status(HttpStatus.NO_CONTENT).send();
            }
            catch(error){
                return response.status(HttpStatus.NOT_FOUND).send({message: "Reserva não encontrada. Verifique o ID informado"});
            }
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. O corpo da requisição está vazia"});
    }
}

export default ReserveRouter;