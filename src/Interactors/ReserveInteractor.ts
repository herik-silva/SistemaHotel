import Reserve from "../Entities/Reserve";
import Database from "../Modules/Database";
import LogInteractor from "../Modules/LogInteractor";
import interactor from "./Interactor";

class ReserveInteractor implements interactor {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async insert(guestName: string, contactPhone: string, roomId: number): Promise<number> {
        const stringSql = "INSERT INTO reservas(nome_hospede, tel_contato_hospede, fk_id_quarto, data_criacao) VALUES(?,?,?,?)";
        const createdAt = new Date();
        var insertedId: number;

        try{
            const connection = await this.database.getConnection();

            await connection.execute(stringSql, [guestName, contactPhone, roomId, createdAt]);
            insertedId = await this.database.getLastId(connection);
            await connection.end();
            LogInteractor.insert("Reserva criada", `A reserva de ID ${insertedId} foi criada`);

            return insertedId;
        }
        catch(error){
            throw error;
        }
    }
    
    async findByPk(id: number): Promise<Reserve> {
        const stringSql = "SELECT * FROM reservas_mantidas WHERE id = ?";
        
        try{
            const connection = await this.database.getConnection();
            const row = await connection.query(stringSql, id);

            await connection.end();
            if(row[0][0]){
                const reserveData = row[0][0];
                
                return new Reserve(
                    reserveData.id,
                    reserveData.nome_hospede,
                    reserveData.tel_contato_hospede,
                    reserveData.fk_id_quarto,
                    reserveData.data_criacao
                );
            }
        }
        catch(error){
            throw error;
        }
    }
    
    async find(key: string, value: string): Promise<Array<Reserve>> {
        const reserveList = new Array<Reserve>();
        const stringSql = "SELECT * FROM reservas_mantidas WHERE ? LIKE ?";

        try{
            const connection = await this.database.getConnection();
            const row = await connection.query(stringSql, [key, value]);
            console.log("CONSULTA OK");
            await connection.end();
            if(row[0][0]){
                const reserveDataList = row[0];
                var index = 0;

                while(reserveDataList[index]){
                    const reserveData = reserveDataList[index];

                    reserveList.push(new Reserve(
                        reserveData.id,
                        reserveData.nome_hospede,
                        reserveData.tel_contato_hospede,
                        reserveData.fk_id_quarto,
                        reserveData.data_criacao
                    ));

                    index++;
                }
            }

            return reserveList;
        }
        catch(error){
            throw error;
        }
    }
    
    async update(id: number, guestName: string, contactPhone: string, roomId: number): Promise<void> {
        const stringSql = "UPDATE reservas SET nome_hospede = ?, tel_contato_hospede = ?, fk_id_quarto = ? WHERE id = ?";

        try{
            const connection = await this.database.getConnection();
            
            await connection.execute(stringSql,[guestName, contactPhone, roomId, id]);
            await connection.end();
            LogInteractor.insert("Reserva atualizada", `A reserva de ID ${id} foi atualizada`);
        }
        catch(error){
            throw error;
        }
    }
    
    async delete(id: number) {
        const stringSql = "UPDATE reservas SET removido = 1 WHERE id = ?";

        try{
            const connection = await this.database.getConnection();
            
            await connection.execute(stringSql, [id]);
            await connection.end();
            LogInteractor.insert("Reserva removida", `A reserva de ID ${id} foi removida`);
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

}

export default ReserveInteractor;