import Room from "../Entities/Room";
import Database from "../Modules/Database";
import LogInteractor from "../Modules/LogInteractor";
import Interactor from "./Interactor";

class RoomInteractor implements Interactor {
    private database: Database;
    
    constructor(database: Database) {
        this.database = database;
    }

    async insert(number: number, accommodationId: number, image: String): Promise<number> {
        console.log(`number: ${number}\naccId: ${accommodationId}\nimage: ${image}`);
        try{
            const stringSql = "INSERT INTO quartos(numero, status, fk_id_acomodacao, foto) VALUES(?,?,?,?)";
            const connection = await this.database.getConnection();
            var insertedId: number;

            await connection.execute(stringSql, [number, "Livre", accommodationId, image]);
            insertedId = await this.database.getLastId(connection);
            await connection.end();
            LogInteractor.insert("Quarto cadastrado", `O quarto número ${number} foi cadastrado. Seu ID é ${insertedId}`);

            return insertedId;
        }
        catch(error){
            console.log(error);
            LogInteractor.insert("Erro", error.code);
            throw error;
        }
    }

    async findByPk(id: number): Promise<Room> {
        try{
            const stringSql = "SELECT * FROM quartos WHERE id = ?";
            const connection = await this.database.getConnection();

            const row = await connection.query(stringSql, id);

            if(row[0][0]){
                const roomData = row[0][0];

                return new Room(
                    roomData.id,
                    roomData.numero,
                    roomData.status,
                    roomData.fk_ultima_acomodacao,
                    roomData.foto
                );
            }
        }
        catch(error){
            throw error;
        }
    }

    async find(key: string, value: string): Promise<Array<Room>> {
        try{
            const roomList = new Array<Room>();
            const stringSql = "SELECT * FROM quartos WHERE ? like ?";
            const connection = await this.database.getConnection();

            const row = await connection.query(stringSql, [key, value]);

            if(row[0][0]){
                const roomDataList = row[0];
                var index = 0;

                while(roomDataList[index]){
                    const roomData = roomDataList[index];

                    roomList.push(new Room(
                        roomData.id,
                        roomData.numero,
                        roomData.status,
                        roomData.fk_id_acomodacao,
                        roomData.foto
                    ));

                    index++;
                }
            }

            return roomList;
        }
        catch(error){
            throw error;
        }
    }

    async update(id: number, number: number, status: string, accommodationId: number, image: string): Promise<boolean> {
        console.log(`number: ${number}\naccId: ${accommodationId}\nimage: ${image}\nstatus: ${status}`);

        try{
            const stringSql = "UPDATE quartos SET numero = ?, status = ?, fk_id_acomodacao = ?, foto = ? WHERE id = ?";
            const connection = await this.database.getConnection();
            
            await connection.execute(stringSql, [number, status, accommodationId, image, id]);
            await connection.end();
            LogInteractor.insert("Quarto atualizado", `Os dados do quarto de ID ${id} foram atualizados`);

            return true;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            const stringSql = "UPDATE quartos removido = 1 WHERE id = ?";
            const connection = await this.database.getConnection();

            await connection.execute(stringSql, id);
            await connection.end();
            LogInteractor.insert("Quarto removido", `O quarto de ID ${id} foi removido`);
            
            return true;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
}

export default RoomInteractor;