import Employee from "../Entity/Employee";
import interactor from "./Interactor";
import { createConnection, Connection } from "mysql2/promise";
import Database from "./Database";
import LogInteractor from "./LogInteractor";

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
        const stringSql = `SELECT * FROM lista_funcionarios WHERE nome LIKE "${name}%"`;

        const connection = await this.getConnection();
        const employeesFound = new Array<Employee>();

        const rows = await connection.query(stringSql);

        // Verifica se algum funcionario foi encontrado!
        if(rows[0][0]){
            var index = 0;
            const employeesText = rows[0];

            // Instancia todos os lista_funcionarios encontrados
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
        const stringSql = "SELECT * FROM funcionarios WHERE id = ?";

        const connection = await this.getConnection();
        const row = await connection.query(stringSql, id);
        connection.end();
        
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
    async insert(name:string, cpf:string, password: string, photo: string, turn: string, contactPhone:Array<string>, currentWage: number, responsabilityId: number): Promise<boolean> {
        try{
            const logTitle = "Funcionário Cadastrado!";
            const logDescription = "O funcionário ${name} foi cadastrado.";
            const stringSql = `INSERT INTO lista_funcionarios VALUES(?,?,?,?,?,?,?,?,?,?)`;
            const connection = await this.getConnection();
            
            await connection.execute(stringSql,
                [
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
            
            LogInteractor.insert(logTitle, logDescription);
                
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
            const logTitle = "Funcionário Atualizado!";
            const logDescription = "O funcionário de ID ${id} foi atualizado.";
            const stringSql = "UPDATE lista_funcionarios SET CPF = ?, nome = ?, foto = ?, senha = ?, turno = ?, idCargo = ?, salarioAtual = ?, telContatoA = ?, telContatoB = ? WHERE id = ?;";
            const connection = await this.getConnection();

            await connection.execute(stringSql,
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

            LogInteractor.insert(logTitle, logDescription);

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
            const logTitle = "Funcionário Deletado!";
            const logDescription = "O funcionário de ID ${id} foi deletado";
            const stringSql = "DELETE FROM lista_funcionarios WHERE id = ?";
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

    /**
     * Autentifica o funcionário dado as suas credênciais.
     * @param name Nome do funcionário
     * @param password Senha do funcionário
     * @returns Retorna o Id do cargo e o nome do funcionário.
     */
    async authenticate(auth: string): Promise<any> {
        try{
            const [name, password] = auth.split(":");
            const stringSql = "SELECT id, nome, idCargo, nivelAcesso FROM lista_funcionarios WHERE nome = ? AND senha = ?";
            const connection = await this.getConnection();
            var logTitle: string;
            var logDescription: string;
            const row = await connection.query(stringSql, [name, password]);
            if(row[0][0]){
                const employeeSelected = row[0][0];
                console.log(employeeSelected);
                logTitle = "Funcionário Autenticado!";
                logDescription = `O funcionário ${name} foi autenticado`;
                LogInteractor.insert(logTitle, logDescription);
                console.log(employeeSelected);
                return {
                    id: employeeSelected.id,
                    responsabilityId: employeeSelected.idCargo,
                    name: employeeSelected.nome,
                    responsabilityName: employeeSelected.nome,
                    acessLevel: employeeSelected.nivelAcesso
                }
            }
        }catch(error){
            throw error;
        }

    }
}

export default EmployeeInteractor;