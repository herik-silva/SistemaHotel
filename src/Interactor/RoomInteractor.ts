import Database from "./Database";
import interactor from "./Interactor";
import { createConnection, Connection } from "mysql2/promise";
import Room from "../Entity/Room";
import LogInteractor from "./LogInteractor";


class RoomInteractor implements interactor {
    private database: Database;

    constructor(database: Database){
        this.database = database;
    }

    async getConnection(): Promise<Connection> {
        return await createConnection(`${this.database.dialect}://${this.database.user}:${this.database.key}@localhost:${this.database.port}/${this.database.database}`);
    }

    async getLastId(connection: Connection): Promise<number> {
        const sqlString = "SELECT LAST_INSERT_ID()";
        
        const row = await connection.query(sqlString);
        const lastId = row[0][0]["LAST_INSERT_ID()"]
        console.log("Ultimo ID: ", lastId);

        return lastId;
    }

    async insert(number: number, photo: string, status: string, accommodation: number): Promise<number> {
        try{
            console.log("INSERIR DADOS");
            const logTitle = "Quarto Cadastrado!";
            const logDescription= `O quarto número ${number} foi cadastrado.`;
            const stringSql = "INSERT INTO quartos(numero, statusAtual, foto, idAcomodacao) VALUES(?,?,?,?)";
            const connection = await this.getConnection();

            console.log(`Numero: ${number}\nPhoto: ${photo}\nStatus:${status}\nAccommodation: ${accommodation}`);

            await connection.execute(stringSql,
                [
                    number,
                    status,
                    photo || null,
                    accommodation
                ]
            );

            const lastId = this.getLastId(connection);
            connection.end();
            LogInteractor.insert(logTitle, logDescription);
            console.log("OK");
            return lastId;
        }
        catch(error){
            console.log("DEU RUIM");
            throw error;
        }
    }

    async findByPk(id: number): Promise<Room> {
        try{
            const stringSql = "SELECT * FROM quartos_habilitados WHERE id = ?";
            
            const connection = await this.getConnection();
            const row = await connection.query(stringSql, id);
            connection.end();

            if(row[0][0]){
                const roomSelected = row[0][0];
                return new Room(
                    roomSelected.id,
                    roomSelected.numero,
                    roomSelected.statusAtual,
                    roomSelected.idAcomodacao,
                    roomSelected.foto
                );
            }
        }
        catch(error){
            throw error;
        }
    }

    async find(field: string, value: string): Promise<Array<Room>> {
        try{
            const stringSql = `SELECT * FROM quartos_habilitados WHERE ${field} LIKE "${value}%"`;

            const connection = await this.getConnection();
            const roomsFound = new Array<Room>();

            const rows = await connection.query(stringSql);

            if(rows[0][0]){
                var index = 0;
                const roomsText = rows[0];

                while(roomsText[index]){
                    const roomSelected = roomsText[index];

                    roomsFound.push(new Room(
                        roomSelected.id,
                        roomSelected.numero,
                        roomSelected.statusAtual,
                        roomSelected.idAcomodacao,
                        `http://localhost:3000/uploads/${roomSelected.foto}`
                    ));

                    index++;
                }

                connection.end();
            }

            return roomsFound;
        }
        catch(error){
            throw error;
        }
    }

    async update(id: number, number: number, photo: string, status: string, accommodation: number): Promise<boolean> {
        try{
            const logTitle = "Quarto Atualizado!";
            const logDescription = `O quarto ${number} foi atualizado.`;
            const connection = await this.getConnection();
            var stringSql: string;
            var params = [number, status, accommodation];

            if(photo){ // Caso necessite de atualizar a foto
                stringSql = "UPDATE quartos SET numero = ?, statusAtual = ?, idAcomodacao = ?, foto = ? WHERE id = ?";
                params.push(photo);
            }
            else{
                stringSql = "UPDATE quartos SET numero = ?, statusAtual = ?, idAcomodacao = ? WHERE id = ?";
            }

            params.push(id);

            await connection.execute(stringSql, params);
            connection.end();
            LogInteractor.insert(logTitle, logDescription);

            return true;
        }
        catch(error){
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            const logTitle = "Quarto Removido!";
            const logDescription = `O quarto ${id} foi removido!`;
            const stringSql = "UPDATE quartos SET removido = true WHERE id = ?";
            const connection = await this.getConnection();
            
            await connection.execute(stringSql, [id]);
            connection.end();
            LogInteractor.insert(logTitle, logDescription);

            return true;
        }catch(error){
            console.log(error);

            return false;
        }
    }
}

export default RoomInteractor;