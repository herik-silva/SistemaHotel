import Employee from "../Entities/Employee";
import Role from "../Entities/Role";
import Database from "../Modules/Database";
import LogInteractor from "../Modules/LogInteractor";
import Interactor from "./Interactor";

class EmployeeInteractor implements Interactor {
    private database: Database;
    
    constructor(database: Database) {
        this.database = database;
    }

    async insert(name: string, password: string, turn: string, roleId: number): Promise<number> {
        try{
            const stringSql = "INSERT INTO funcionarios(nome, senha, turno, fk_id_cargo) VALUES(?,?,?,?)";
            const connection = await this.database.getConnection();
            const createdAt = new Date();
            var lastId: number;
    
            connection.execute(stringSql, [name, password, turn, roleId]);
            lastId = await this.database.getLastId(connection);
            connection.end();
            LogInteractor.insert("Funcionário cadastrado", `O Funcionário ID ${lastId} - ${name} foi cadastrado!`);
    
            return lastId;
        }
        catch(error){
            throw error;
        }
    }

    async findByPk(id: number): Promise<Employee> {
        try{
            const stringSql = "SELECT * FROM lista_funcionarios WHERE id = ?";
            const connection = await this.database.getConnection();
            const row = connection.query(stringSql, [id]);

            if(row[0][0]){
                const employeeData = row[0][0];
                const role = new Role(
                    employeeData.fk_id_cargo,
                    employeeData.nome_cargo,
                    employeeData.nivel_acesso
                )

                return new Employee(
                    employeeData.id,
                    employeeData.nome,
                    employeeData.senha,
                    employeeData.turno,
                    role
                );
            }
        }
        catch(error){
            throw error;
        }
    }

    async find(key: string, value: string) {
        try{
            const employeeList = new Array<Employee>();
            const stringSql = "SELECT * FROM lista_funcionarios WHERE ? LIKE ?";
            const connection = await this.database.getConnection();
            const row = await connection.query(stringSql, [key, value]);

            if(row[0][0]){
                const employeeDataList = row[0];
                var index = 0;

                while(employeeDataList[index]){
                    const employeeData = employeeDataList[index];
                    const role = new Role(
                        employeeData.fk_id_cargo,
                        employeeData.nome_cargo,
                        employeeData.nivel_acesso
                    )

                    employeeList.push(new Employee(
                        employeeData.id,
                        employeeData.nome,
                        employeeData.senha,
                        employeeData.turno,
                        role
                    ));

                    index++;
                }
            }

            return employeeList;
        }
        catch(error){
            throw error;
        }
    }

    async update(id: number, name: string, password: string, turn: string, roleId: number): Promise<boolean> {
        try{
            const stringSql = "UPDATE funcionarios SET nome = ?, senha = ?, turno = ?, fk_id_cargo = ? WHERE id = ? AND removido = 0";
            const connection = await this.database.getConnection();
            const row = await connection.execute(stringSql, [name, password, turn, roleId, id]);
            const changedRows = row[0]["changedRows"];

            connection.end();
            
            if(changedRows>0){
                LogInteractor.insert("Funcionário atualizado", `Os dados do funcionário de ID ${id} foram atualizados`);
                return true;
            }

            return false;
        }
        catch(error){
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            const stringSql = "UPDATE funcionarios SET removido = 1 WHERE id = ? AND removido = 0";
            const connection = await this.database.getConnection();
            const row = await connection.execute(stringSql, [id]);
            const affectedRows = row[0]["affectedRows"];

            connection.end();
            console.log("AFETADOS: ", affectedRows);
            if(affectedRows>0){
                LogInteractor.insert("Funcionário removido", `Os dados do funcionário de ID ${id} foram removidos`);
                return true;
            }

            return false;
        }
        catch(error){
            throw error;
        }
    }
}

export default EmployeeInteractor;