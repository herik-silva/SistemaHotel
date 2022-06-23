import Database from "./Database";
import { createConnection, Connection } from "mysql2/promise";
import interactor from "./Interactor";
import Responsability from "../Entity/Responsibility";
import LogInteractor from "./LogInteractor";

class ResponsabilityInteractor implements interactor {
    private database: Database;

    constructor(database: Database){
        this.database = database;
    }

    async getConnection(): Promise<Connection> {
        return await createConnection(`${this.database.dialect}://${this.database.user}:${this.database.key}@localhost:${this.database.port}/${this.database.database}`);
    }

    async find(name: string): Promise<Array<Responsability>> {
        try{
            const stringSql = `SELECT * FROM cargos WHERE descricao LIKE "${name}%"`;

            const connection = await this.getConnection();
            const responsabilityFound = new Array<Responsability>();
            console.log("Buscando por ", name, " no banco de dados");

            const rows = await connection.query(stringSql);
        
            if(rows[0][0]){
                var index = 0;
                const responsabilityText = rows[0];

                while(responsabilityText[index]){
                    const responsabilitySelected = responsabilityText[index];

                    responsabilityFound.push(new Responsability(
                        responsabilitySelected.id,
                        responsabilitySelected.nome,
                        responsabilitySelected.nivelAcesso
                    ));

                    index++;
                }

                connection.end();

                return responsabilityFound;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async findByPk(id: number): Promise<Responsability> {
        try{
            const stringSql = "SELECT * FROM cargos WHERE id = ?";

            const connection = await this.getConnection();
            const row = await connection.query(stringSql, id);
            connection.end();

            if(row[0][0]){
                const responsabilitySelected = row[0][0];
                
                return new Responsability(
                    responsabilitySelected.id,
                    responsabilitySelected.nome,
                    responsabilitySelected.nivelAcesso
                );
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async insert(name: string, acessLevel: number): Promise<boolean> {
        try{
            const logTitle = "Cargo Cadastrado";
            const logDescription = `O Cargo ${name} com nível de acesso ${acessLevel} foi cadastrado.`;
            const stringSql = "INSERT INTO cargos VALUES(?,?,?)";
            const connection = await this.getConnection();

            await connection.execute(stringSql,
                [
                    name,
                    acessLevel
                ]
            );
            connection.end();
            LogInteractor.insert(logTitle, logDescription);

            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async update(id: number, name: string, acessLevel: number): Promise<boolean> {
        try{
            const logTitle = "Cargo Atualizado!";
            const logDescription = `O Cargo de ID ${id} foi atualizado`;
            const stringSql = "UPDATE cargos SET nome = ?, nivelAcesso = ? WHERE id = ?";
            const connection = await this.getConnection();

            await connection.execute(stringSql,
                [
                    name,
                    acessLevel,
                    id
                ]
            );
            connection.end();
            LogInteractor.insert(logTitle, logDescription);

            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            const logTitle = "Cargo Deletado!";
            const logDescription = `O cargo de ID ${id} foi removido.`
            const stringSql = "DELETE FROM cargos WHERE id = ?";
            const connection = await this.getConnection();

            await connection.execute(stringSql, [id]);
            connection.end();
            LogInteractor.insert(logTitle, logDescription);
            
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }
}

export default ResponsabilityInteractor;