import Role from "../Entities/Role";
import Database from "../Modules/Database";
import LogInteractor from "../Modules/LogInteractor";
import Interactor from "./Interactor";

class RoleInteractor implements Interactor {
    private database: Database;

    constructor(database: Database) {
        this.database = database;    
    }

    async insert(name: string, dailyCost: number): Promise<number> {
        try{
            const connection = await this.database.getConnection();
            const stringSql = "INSERT INTO cargos(nome, nivel_acesso) VALUES(?,?)";
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

    async findByPk(id: number): Promise<Role> {
        try{
            const connection = await this.database.getConnection();
            const stringSql = "SELECT * FROM cargos WHERE id = ?";
            const row = await connection.query(stringSql, [id]);

            connection.end();
            if(row[0][0]){
                const roleData = row[0][0];
                
                return new Role(
                    roleData.id,
                    roleData.nome,
                    roleData.nivel_acesso
                );
            }
        }
        catch(error){
            throw error;
        }
    }
    
    async find(value: string): Promise<Array<Role>> {
        const roleList = new Array<Role>();
        const stringSql = "SELECT * FROM cargos WHERE nome LIKE ?";

        try{
            const connection = await this.database.getConnection();
            const row = await connection.query(stringSql, value);

            if(row[0][0]){
                var index = 0;
                const roleDataList = row[0];

                while(roleDataList[index]){
                    const selectedRole = roleDataList[index];

                    roleList.push(new Role(
                        selectedRole.id,
                        selectedRole.nome,
                        selectedRole.nivel_acesso
                    ));

                    index++;
                }
            }

        }
        catch(error){
            throw error;
        }

        return roleList;
    }
    
    async update(id: number, name: string, dailyCost: number): Promise<boolean> {
        const stringSql = "UPDATE cargos SET nome = ?, nivel_acesso = ? WHERE id = ?";
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
        const stringSql = "DELETE FROM cargos WHERE id = ?";

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

export default RoleInteractor;