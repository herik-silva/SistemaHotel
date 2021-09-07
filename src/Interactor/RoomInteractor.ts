import Database from "./Database";
import interactor from "./Interactor";
import { createConnection, Connection } from "mysql2/promise";
import Room from "../Entity/Room";


class RoomInteractor implements interactor {
    private database: Database;

    constructor(database: Database){
        this.database = database;
    }

    async getConnection(): Promise<Connection> {
        return await createConnection(`${this.database.dialect}://${this.database.user}:${this.database.key}@localhost:${this.database.port}/${this.database.database}`);
    }

    async insert(number: number, photo: string, status: string, accommodation: number): Promise<boolean> {
        try{
            const connection = await this.getConnection();

            await connection.execute("INSERT INTO quartos VALUES(?,?,?,?)",
                [
                    number,
                    photo,
                    status,
                    accommodation
                ]
            );
            connection.end();

            return true;
        }
        catch(error){
            throw error;
        }
    }

    async findByPk(id: number): Promise<Room> {
        try{
            const connection = await this.getConnection();

            const row = await connection.query("SELECT * FROM quartos WHERE id = ?", id);
            connection.end();

            if(row[0][0]){
                const roomSelected = row[0][0];

                return new Room(
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
            const connection = await this.getConnection();
            const roomsFound = new Array<Room>();

            const rows = await connection.query(`SELECT * FROM quartos WHERE ${field} LIKE "${value}%"`);

            if(rows[0][0]){
                var index = 0;
                const roomsText = rows[0];

                while(roomsText[index]){
                    const roomSelected = roomsText[index];

                    roomsFound.push(new Room(
                        roomSelected.numero,
                        roomSelected.statusAtual,
                        roomSelected.idAcomodacao,
                        roomSelected.foto
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

    async update(number: number, photo: string, status: string, accommodation: number): Promise<boolean> {
        try{
            const connection = await this.getConnection();

            await connection.execute("UPDATE quartos SET foto = ?, statusAtual = ?, idAcomodacao = ? WHERE numero = ?",
                [
                    photo,
                    status,
                    accommodation,
                    number
                ]
            );
            connection.end();

            return true;
        }
        catch(error){
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            const connection = await this.getConnection();

            await connection.execute("DELETE FROM quartos WHERE numero = ?", [id]);
            connection.end();

            return true;
        }catch(error){
            console.log(error);

            return false;
        }
    }
}

export default RoomInteractor;