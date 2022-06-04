import Database from "./Database";
import { createConnection, Connection } from "mysql2/promise";
import interactor from "./Interactor";
import Accommodation from "../Entity/Accommodation";
import LogInteractor from "./LogInteractor";

class AccommodationInteractor implements interactor {
    private database: Database;

    constructor(database: Database){
        this.database = database;
    }

    async getConnection(): Promise<Connection> {
        return await createConnection(`${this.database.dialect}://${this.database.user}:${this.database.key}@localhost:${this.database.port}/${this.database.database}`);
    }

    async find(name: string): Promise<Array<Accommodation>> {
        try{
            const accommodationsFound = new Array<Accommodation>();
            const stringSql = `SELECT * FROM acomodacoes WHERE descricao LIKE "${name}%"`;

            const connection = await this.getConnection();
            const rows = await connection.query(stringSql);
        
            if(rows[0][0]){
                var index = 0;
                const accommodationsText = rows[0];

                while(accommodationsText[index]){
                    const accommodationSelected = accommodationsText[index];

                    accommodationsFound.push(new Accommodation(
                        accommodationSelected.id,
                        accommodationSelected.descricao,
                        accommodationSelected.custoDiaria
                    ));

                    index++;
                }

                connection.end();

                return accommodationsFound;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async findByPk(id: number): Promise<Accommodation> {
        try{
            const stringSql = "SELECT * FROM acomodacoes WHERE id = ?";

            const connection = await this.getConnection();
            const row = await connection.query(stringSql, id);
            connection.end();

            if(row[0][0]){
                const accommodationSelected = row[0][0];
                
                return new Accommodation(
                    accommodationSelected.id,
                    accommodationSelected.descricao,
                    accommodationSelected.custoDiaria
                );
            }
        }
        catch(error){
            console.log(error);
        }
    }

    async insert(id: number, description: string, dailyPrice: number): Promise<boolean> {
        try{
            const logInteractor = new LogInteractor("../../logs/log.txt");
            const stringSql = "INSERT INTO acomodacoes VALUES(?,?,?)";
            const connection = await this.getConnection();
            await connection.execute(stringSql,
                [
                    id,
                    description,
                    dailyPrice
                ]
            );
            connection.end();
            logInteractor.insert("Acomodação Inserida", `A acomodação ${description} com a diária de R$ ${dailyPrice} foi cadastrada`);
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async update(id: number, description: string, dailyPrice: number): Promise<boolean> {
        try{
            const stringSql = "UPDATE acomodacoes SET descricao = ?, custoDiaria = ? WHERE id = ?";

            const connection = await this.getConnection();
            await connection.execute(stringSql,
                [
                    description,
                    dailyPrice,
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
            const stringSql = "DELETE FROM acomodacoes WHERE id = ?";

            const connection = await this.getConnection();
            await connection.execute(stringSql, [id]);
            connection.end();

            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }
}

export default AccommodationInteractor;