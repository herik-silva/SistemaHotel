    import Accommodation from "../Entities/Accommodation";
import Database from "../Modules/Database";
import LogInteractor from "../Modules/LogInteractor";
import Interactor from "./Interactor";

/**
 * Realiza a interação com o banco de dados na tabela
 * de acomodações como, inserir, atualizar, buscar e deletar.
 * A classe tem como atributo:
 * - database: Database -> Banco de dados que será conectado.
 */
class AccommodationInteractor implements Interactor {
    private database: Database;

    constructor(database: Database) {
        this.database = database;    
    }

    async insert(name: string, dailyCost: number): Promise<number> {
        try{
            const connection = await this.database.getConnection();
            const stringSql = "INSERT INTO acomodacoes(nome, custo_diaria) VALUES(?,?)";
            var lastId: number;

            connection.execute(stringSql,[name, dailyCost]);
            lastId = await this.database.getLastId(connection);
            connection.end();
            LogInteractor.insert("Acomodação inserida", `A acomodação ${name}:R$${dailyCost} foi inserida!`);

            return lastId;
        }
        catch(error){
            throw error;
        }
    }

    async findByPk(id: number): Promise<Accommodation> {
        try{
            const connection = await this.database.getConnection();
            const stringSql = "SELECT * FROM acomodacoes WHERE id = ?";
            const row = await connection.query(stringSql, [id]);

            connection.end();
            if(row[0][0]){
                const accommodationData = row[0][0];
                
                return new Accommodation(
                    accommodationData.id,
                    accommodationData.nome,
                    accommodationData.custo_diaria
                );
            }
        }
        catch(error){
            throw error;
        }
    }
    
    async find(value: string): Promise<Array<Accommodation>> {
        const accommodationList = new Array<Accommodation>();
        const stringSql = "SELECT * FROM acomodacoes WHERE nome LIKE ?";

        try{
            const connection = await this.database.getConnection();
            const row = await connection.query(stringSql, value);

            if(row[0][0]){
                var index = 0;
                const accommodationDataList = row[0];

                while(accommodationDataList[index]){
                    const selectedAccommodation = accommodationDataList[index];

                    accommodationList.push(new Accommodation(
                        selectedAccommodation.id,
                        selectedAccommodation.nome,
                        selectedAccommodation.custo_diaria
                    ));

                    index++;
                }
            }

        }
        catch(error){
            throw error;
        }

        return accommodationList;
    }
    
    async update(id: number, name: string, dailyCost: number): Promise<boolean> {
        const stringSql = "UPDATE acomodacoes SET nome = ?, custo_diaria = ? WHERE id = ?";
        try{
            const connection = await this.database.getConnection();
            const result = await connection.execute(stringSql, [name, dailyCost, id]);
            await connection.end();
            if(result[0]['changedRows'] > 0){
                LogInteractor.insert("Acomodação atualizada", `A acomodação de ID ${id} foi atualizada!`);
                return true;
            }

            return false;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }
    
    async delete(id: number): Promise<boolean> {
        const sqlRemoveDependence = "UPDATE quartos SET fk_id_acomodacao = 1 WHERE fk_id_acomodacao = ?";
        const stringSql = "DELETE FROM acomodacoes WHERE id = ?";

        try{
            const connection = await this.database.getConnection();

            await connection.execute(sqlRemoveDependence, [id]);
            const result = await connection.execute(stringSql, [id]);
            await connection.end();

            if(result[0]['affectedRows'] > 0){
                LogInteractor.insert("Acomodação excluída", `A acomodação de ID ${id} foi removida!`);
                return true;
            }

            return false;
        }
        catch(error){
            throw error;
        }
    }
}

export default AccommodationInteractor;