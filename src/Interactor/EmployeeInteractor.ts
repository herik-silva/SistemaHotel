import Employee from "../Entity/Employee";
import interactor from "./Interactor";
import { createConnection, Connection } from "mysql2/promise";
import Database from "./Database";

class EmployeeInteractor implements interactor {
    private database: Database;

    constructor(database: Database){
        this.database = database;
    }

    async getConnection(): Promise<Connection> {
        return await createConnection(`${this.database.dialect}://${this.database.user}:${this.database.key}@localhost:${this.database.port}/${this.database.database}`);
    }

    /**
     * Realiza a busca de um funcionario pelo seu nome.
     * @param name 
     * @returns 
     */
    async find(name: string): Promise<Array<Employee>> {
        const connection = await this.getConnection();
        const employeesFound = new Array<Employee>();
        console.log("Conectou!\nBuscando por ", name, " no banco de dados");

        const rows = await connection.query(`SELECT * FROM funcionarios WHERE nome LIKE "${name}%"`);

        // Verifica se algum funcionario foi encontrado!
        if(rows[0][0]){
            var index = 0;
            const employeesText = rows[0];

            // Instancia todos os funcionarios encontrados
            while(employeesText[index]){
                const employeeSelected = employeesText[index];

                employeesFound.push(new Employee(
                    employeeSelected.id,
                    employeeSelected.nome,
                    employeeSelected.CPF,
                    [employeeSelected.telContatoA, employeeSelected.telContatoB],
                    employeeSelected.foto,
                    employeeSelected.turno,
                    employeeSelected.salarioAtual,
                    employeeSelected.senha,
                    employeeSelected.idCargo
                ));
    
                index++;
            }

            connection.end();
            
            return employeesFound;
        }
    }

    /**
     * Realiza a busca de funcionario pela sua chave primária
     * @param id 
     * @returns 
     */
    async findByPk(id: number): Promise<Employee> {
        const connection = await this.getConnection();

        const row = await connection.query("SELECT * FROM funcionarios WHERE id = ?", id);

        // Verifica se foi encontrado algum funcionario
        if(row[0][0]){
            const employeeSelected = row[0][0];

            return new Employee(
                employeeSelected.id,
                employeeSelected.nome,
                employeeSelected.CPF,
                [employeeSelected.telContatoA, employeeSelected.telContatoB],
                employeeSelected.foto,
                employeeSelected.turno,
                employeeSelected.salarioAtual,
                employeeSelected.senha,
                employeeSelected.idCargo
            )
        }
    }

    /**
     * Insere um funcionario no banco de dados
     * @param id 
     * @param name 
     * @param cpf 
     * @param password 
     * @param photo 
     * @param turn 
     * @param contactPhone 
     * @param currentWage 
     * @param responsabilityId 
     * @returns 
     */
    async insert(id:number, name:string, cpf:string, password: string, photo: string, turn: string, contactPhone:Array<string>, currentWage: number, responsabilityId: number): Promise<boolean> {
        try{
            const connection = await this.getConnection();
            await connection.execute(`INSERT INTO funcionarios VALUES(?,?,?,?,?,?,?,?,?,?);`,
                [
                    id,
                    cpf,
                    name,
                    password,
                    photo,
                    turn,
                    responsabilityId,
                    currentWage,
                    contactPhone[0],
                    contactPhone[1],
                ]
            );
            connection.end();
 
            return true;
        }catch(error){
            console.log(error);
            return false;
        }
    }

    /**
     * Atualiza os dados de um funcionário no banco de dados
     * @param id 
     * @param name 
     * @param cpf 
     * @param password 
     * @param photo 
     * @param turn 
     * @param contactPhone 
     * @param currentWage 
     * @param responsabilityId 
     * @returns 
     */
    async update(id:number, name:string, cpf:string, password: string,photo: string, turn: string,contactPhone:Array<string>, currentWage: number, responsabilityId: number): Promise<any> {
        try{
            const connection = await this.getConnection();

            await connection.execute("UPDATE funcionarios SET CPF = ?, nome = ?, foto = ?, senha = ?, turno = ?, idCargo = ?, salarioAtual = ?, telContatoA = ?, telContatoB = ? WHERE id = ?;",
                [
                    cpf,
                    name,
                    photo,
                    password,
                    turn,
                    responsabilityId,
                    currentWage,
                    contactPhone[0],
                    contactPhone[1],
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

    /**
     * Deleta um funcionario do banco de dados
     * @param id 
     * @returns 
     */
    async delete(id: number): Promise<boolean> {
        try{
            const connection = await this.getConnection();

            await connection.execute("DELETE FROM funcionarios WHERE id = ?", [id]);
            connection.end();

            return true;
        }catch(error){
            console.log(error);

            return false;
        }
    }
}

export default EmployeeInteractor;