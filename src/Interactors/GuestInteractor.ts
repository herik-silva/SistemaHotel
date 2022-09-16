import Guest from "../Entities/Guest";
import Database from "../Modules/Database";
import LogInteractor from "../Modules/LogInteractor";
import Interactor from "./Interactor";

class GuestInteractor implements Interactor {
    private database: Database;
    
    constructor(database: Database) {
        this.database = database;
    }

    async insert(name: string, CPF: string, contactPhone: string, sex: string, city: string): Promise<number> {
        try{
            const stringSql = "INSERT INTO hospedes(nome, CPF, telefone_contato, sexo, cidade, data_cadastro) VALUES(?,?,?,?,?,?)";
            const connection = await this.database.getConnection();
            const createdAt = new Date();
            var lastId: number;
    
            connection.execute(stringSql, [name, CPF, contactPhone, sex, city, createdAt]);
            lastId = await this.database.getLastId(connection);
            connection.end();
            LogInteractor.insert("Hospede cadastrado", `O hospede ID ${lastId} - ${name} foi cadastrado!`);
    
            return lastId;
        }
        catch(error){
            throw error;
        }
    }

    async findByPk(id: number): Promise<Guest> {
        try{
            const stringSql = "SELECT * FROM hospedes WHERE id = ?";
            const connection = await this.database.getConnection();
            const row = connection.query(stringSql, [id]);

            if(row[0][0]){
                const guestData = row[0][0];

                return new Guest(
                    guestData.id,
                    guestData.nome,
                    guestData.CPF,
                    guestData.telefone_contato,
                    guestData.sexo,
                    guestData.cidade,
                    guestData.fk_ultima_acomodacao,
                    guestData.data_cadastro
                );
            }
        }
        catch(error){
            throw error;
        }
    }

    async find(key: string, value: string) {
        try{
            const guestList = new Array<Guest>();
            const stringSql = "SELECT * FROM hospedes WHERE ? LIKE ?";
            const connection = await this.database.getConnection();
            const row = await connection.query(stringSql, [key, value]);

            if(row[0][0]){
                const guestDataList = row[0];
                var index = 0;

                while(guestDataList[index]){
                    const guestData = guestDataList[index];

                    guestList.push(new Guest(
                        guestData.id,
                        guestData.nome,
                        guestData.CPF,
                        guestData.telefone_contato,
                        guestData.sexo,
                        guestData.cidade,
                        guestData.fk_ultima_acomodacao,
                        guestData.data_cadastro
                    ));

                    index++;
                }
            }

            return guestList;
        }
        catch(error){
            throw error;
        }
    }

    async update(id: number, name: string, CPF: string, contactPhone: string, sex: string, city: string, lastAccommodationId: number): Promise<boolean> {
        try{
            const stringSql = "UPDATE hospedes SET nome = ?, CPF = ?, telefone_contato = ?, sexo = ?, cidade = ?, fk_ultima_acomodacao = ? WHERE id = ?";
            const connection = await this.database.getConnection();

            await connection.execute(stringSql, [name, CPF, contactPhone, sex, city, lastAccommodationId, id]);
            connection.end();
            LogInteractor.insert("Hospede atualizado", `Os dados do hospede de ID ${id} foram atualizados`);

            return true;
        }
        catch(error){
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            const stringSql = "UPDATE hospedes SET removido = 1 WHERE id = ?";
            const connection = await this.database.getConnection();

            await connection.execute(stringSql, [id]);
            connection.end();
            LogInteractor.insert("Hospede removido", `Os dados do hospede de ID ${id} foram removidos`);

            return true;
        }
        catch(error){
            throw error;
        }
    }

}

export default GuestInteractor;