import Occupation from "../Entities/Occupation";
import Database from "../Modules/Database";
import LogInteractor from "../Modules/LogInteractor";
import Interactor from "./Interactor";

class OccupationInteractor implements Interactor {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }
    
    async insert(reserveId: number, initDate: Date, endDate: Date, guestId: number, employeeId: number, amountPeople: number, observations: string): Promise<number> {
        const stringSql = "INSERT INTO ocupacoes(fk_id_reserva, data_iniio, data_fim, fk_id_hospede, fk_id_funcionario, quantidade_pessoas, observacoes) VALUES(?,?,?,?,?,?,?)";
        var insertedId: number;

        try{
            const connection = await this.database.getConnection();
            
            await connection.execute(stringSql, [reserveId, initDate, endDate, guestId, employeeId, amountPeople, observations]);
            insertedId = await this.database.getLastId(connection);
            await connection.end();
            LogInteractor.insert("Ocupação inserida", `A ocupação de ID ${insertedId} foi inserida`);

            return insertedId;
        }
        catch(error){
            throw error;
        }
    }
    
    async findByPk(id: number): Promise<Occupation> {
        const stringSql = "SELECT * FROM lista_ocupacoes WHERE id = ?";
        
        try{
            const connection = await this.database.getConnection();
            const row = await connection.query(stringSql, id);
            
            if(row[0][0]){
                const occupationData = row[0][0];

                return new Occupation(
                    occupationData.id,
                    occupationData.fk_id_reserva,
                    occupationData.data_inicio,
                    occupationData.data_fim,
                    occupationData.fk_id_hospede,
                    occupationData.fk_id_funcionario,
                    occupationData.ultimoCheckin,
                    occupationData.quantidade_checkin,
                    occupationData.quantidade_pessoas,
                    occupationData.observacoes
                );
            }
        }
        catch(error){
            throw error;
        }
    }
    
    async find(key: string, value: string): Promise<Array<Occupation>> {
        const stringSql = "SELECT * FROM lista_ocupacoes WHERE ? LIKE ?";

        try{
            const occupationList = new Array<Occupation>();
            const connection = await this.database.getConnection();
            const row = await connection.query(stringSql, [key, value]);

            if(row[0][0]){
                const occupationDataList = row[0];
                var index = 0;

                while(occupationDataList[index]){
                    const occupationData = occupationDataList[index];

                    occupationList.push(new Occupation(
                        occupationData.id,
                        occupationData.fk_id_reserva,
                        occupationData.data_inicio,
                        occupationData.data_fim,
                        occupationData.fk_id_hospede,
                        occupationData.fk_id_funcionario,
                        occupationData.ultimoCheckin,
                        occupationData.quantidade_checkin,
                        occupationData.quantidade_pessoas,
                        occupationData.observacoes
                    ));

                    index++;
                }
            }

            return occupationList;
        }
        catch(error){
            throw error;
        }
    }
    
    async update(id: number, reserveId: number, initDate: Date, endDate: Date, guestId: number, amountPeople: number, observations: string, lastCheckin: Date, amountCheckin: number): Promise<void> {
        const stringSql = "UPDATE ocupacoes SET fk_id_reserva = ?, data_inicio = ?, data_fim = ?, fk_id_hospede = ?, ultimo_checkin = ?, quantidade_checkin = ?, quantidade_pessoas = ?, observacoes = ? WHERE id = ?";

        try{
            const connection = await this.database.getConnection();
            
            await connection.execute(stringSql, [reserveId, initDate.getTime(), endDate.getTime(), guestId, amountPeople, observations, lastCheckin, amountCheckin, id]);
            await connection.end();
            LogInteractor.insert("Ocupação atualizada", `A ocupação de ID ${id} foi atualizada`);
        }
        catch(error){
            throw error;
        }
    }
    
    async delete(id: number): Promise<void> {
        const stringSql = "UPDATE ocupacoes SET removido = 1 WHERE id = ?";

        try{
            const connection = await this.database.getConnection();

            await connection.execute(stringSql, id);
            await connection.end();
            LogInteractor.insert("Ocupação removida", `A acomodação de ID ${id} foi removida`)
        }
        catch(error){
            throw error;
        }
    }

}

export default OccupationInteractor;