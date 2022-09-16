import { Request, Response } from "express";
import AccommodationInteractor from "../Interactors/AccommodationInteractor";
import Database from "../Modules/Database";
import HttpStatus from "../Modules/HttpStatus";
import Router from "./Router";

/**
 * A classe AccommodationRouter é responsável por receber as requisições feitas 
 * para a rota de acomodações. 
 * Sua função é receber as requisições e realizar operações de acordo 
 * com o tipo de requisição que são:
 *  - GET → Resgatar informação do servidor(dados de acomodações).
 *  - POST → Criar uma nova informação no servidor(Inserir novas acomodações).
 *  - PUT → Atualizar informações armazenadas no servidor(Alterar dados de acomodações).
 *  - DELETE → Remover informações armazenadas no servidor(Remover acomodações).
 * 
 * Para mais informações consulte a documentação: https://www.notion.so/10f18ead003e4a8289adceb7d58564cf?v=249c80fd71274313a9e476403bceb277
 */
class AccommodationRouter implements Router {
    private accommodationInteractor: AccommodationInteractor;
    
    constructor(database: Database){
        this.accommodationInteractor = new AccommodationInteractor(database);
    }

    private validateFields(body: any): boolean {
        return body.name && body.dailyCost;
    }

    async get(request: Request, response: Response): Promise<Response> {
        if(request.params.id){
            if(request.params.id == "*"){
                const accommodationList = await this.accommodationInteractor.find("%");
    
                if(accommodationList.length > 0){
                    return response.status(HttpStatus.OK).send(accommodationList);
                }
    
                return response.status(HttpStatus.NOT_FOUND).send({message: "Sem acomodações cadastradas"});
            }
            else{
                const id = parseInt(request.params.id);
                if(id){
                    const accommodation = await this.accommodationInteractor.findByPk(id);
    
                    if(accommodation){
                        return response.status(HttpStatus.OK).send(accommodation);
                    }
                    
                    return response.status(HttpStatus.NOT_FOUND).send({message: "Acomodação não encontrada"});
                }
            }
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. No parâmetro ID deve conter apenas números ou asterísco(*)"})
    }

    async post(request: Request, response: Response): Promise<Response> {
        if(request.body){
            const validatedFields = this.validateFields(request.body);

            if(validatedFields){
                const accommodationData = request.body;
                const lastId = await this.accommodationInteractor.insert(accommodationData.name, accommodationData.dailyCost);
                
                return response.status(HttpStatus.CREATED).send({lastId});
            }
            
            return response.status(HttpStatus.BAD_REQUEST).send({message: "Campos inválidos. Verifique os campos que são enviados."});
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. O corpo da requisição está vazia"});
    }
    
    async put(request: Request, response: Response): Promise<Response> {
        if(request.body){
            const validatedFields = this.validateFields(request.body) && request.body.id;

            if(validatedFields){
                const accommodationData = request.body;
                const hasUpdated = await this.accommodationInteractor.update(
                    accommodationData.id,
                    accommodationData.name,
                    accommodationData.dailyCost
                );
                
                if(hasUpdated)
                    return response.status(HttpStatus.NO_CONTENT).send();
    
                return response.status(HttpStatus.NOT_FOUND).send({message: "Acomodação não encontrada. ID inválido"});
            }

            return response.status(HttpStatus.BAD_REQUEST).send({message: "Campos inválidos. Verifique os campos que são enviados."});
        }

        return response.status(HttpStatus.BAD_REQUEST).send({message: "Requisição inválida. O corpo da requisição está vazia"});
    }

    async delete(request: Request, response: Response): Promise<Response> {
        if(request.params.id){
            try{
                const id = parseInt(request.params.id);
                
                if(id){
                    const hasDeleted = await this.accommodationInteractor.delete(id);
                    const statusCode = hasDeleted ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND;
        
                    return response.status(statusCode).send();
                }
            }
            catch(error){
                console.log(error);
                return response.status(HttpStatus.BAD_REQUEST).send({message: "O parâmero ID deve ser um número inteiro"});
            }
    
    
            return response.status(400);
        }
    }
}

export default AccommodationRouter;