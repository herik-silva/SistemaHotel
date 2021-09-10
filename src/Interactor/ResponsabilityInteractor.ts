import Database from "./Database";
import { createConnection, Connection } from "mysql2/promise";
import interactor from "./Interactor";
import Responsability from "../Entity/Responsibility";

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
            const connection = await this.getConnection();
            const responsabilityFound = new Array<Responsability>();
            console.log("Buscando por ", name, " no banco de dados");

            const rows = await connection.query(`SELECT * FROM cargos WHERE descricao LIKE "${name}%"`);
        
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
            const connection = await this.getConnection();

            const row = await connection.query("SELECT * FROM cargos WHERE id = ?", id);
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

    async insert(id: number, name: string, acessLevel: number): Promise<boolean> {
        try{
            const connection = await this.getConnection();

            await connection.execute("INSERT INTO cargos VALUES(?,?,?)",
                [
                    id,
                    name,
                    acessLevel
                ]
            );
            connection.end();

            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async update(id: number, name: string, acessLevel: number): Promise<boolean> {
        try{
            const connection = await this.getConnection();

            await connection.execute("UPDATE cargos SET nome = ?, nivelAcesso = ? WHERE id = ?",
                [
                    name,
                    acessLevel,
                    id
                ]
            );
            connection.end();

            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            const connection = await this.getConnection();

            await connection.execute("DELETE FROM cargos WHERE id = ?", [id]);
            connection.end();

            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }
}

export default ResponsabilityInteractor;