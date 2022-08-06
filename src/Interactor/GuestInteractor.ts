import Guest from "../Entity/Guest";
import interactor from "./Interactor";
import { createConnection, Connection } from "mysql2/promise";
import Database from "./Database";
import LogInteractor from "./LogInteractor";

class GuestInteractor implements interactor {
    private database: Database;

    constructor(database: Database){
        this.database = database;
    }

    async getConnection(): Promise<Connection> {
        return await createConnection(`${this.database.dialect}://${this.database.user}:${this.database.key}@localhost:${this.database.port}/${this.database.database}`);
    }

    /**
     * Realiza a busca de um hospede pelo campo desejado.
     * @param key Campo que será utilizado na busca.
     * @param value Valor que será pesquisado. 
     * @returns 
     */
    async find(key: string, value: string): Promise<Array<Guest>> {
        const stringSql = `SELECT * FROM hospedes WHERE ? LIKE ?`;

        const connection = await this.getConnection();
        const guestsFound = new Array<Guest>();

        const rows = await connection.query(stringSql, [key, value]);
        connection.end();

        // Verifica se algum hospede foi encontrado!
        if(rows[0][0]){
            var index = 0;
            const guestsText = rows[0];
            console.log(guestsText);
            // Instancia todos os hospedes encontrados
            while(guestsText[index]){
                const guestSelected = guestsText[index];

                guestsFound.push(new Guest(
                    guestSelected.id,
                    guestSelected.nome,
                    guestSelected.cpf,
                    [guestSelected.telefoneContatoA, guestSelected.telefoneContatoB],
                    guestSelected.cidade, 
                    guestSelected.idEmpresa,
                    guestSelected.idUltimaAcomodacao,
                    guestSelected.foto
                ));
    
                index++;
            }
            
            return guestsFound;
        }
    }

    /**
     * Realiza a busca de hospede pela sua chave primária
     * @param id 
     * @returns 
     */
    async findByPk(id: number): Promise<Guest> {
        const stringSql = "SELECT * FROM hospedes WHERE id = ?";

        const connection = await this.getConnection();
        const row = await connection.query(stringSql, id);
        connection.end();

        // Verifica se foi encontrado algum hospede
        if(row[0][0]){
            const guestSelected = row[0][0];

            return new Guest(
                guestSelected.id,
                guestSelected.nome,
                guestSelected.cpf,
                [guestSelected.telefoneContatoA, guestSelected.telefoneContatoB],
                guestSelected.cidade, 
                guestSelected.idEmpresa,
                guestSelected.idUltimaAcomodacao,
                guestSelected.foto
            );
        }
    }

    /**
     * Insere um hospede no banco de dados
     * @param name 
     * @param cpf 
     * @param photo 
     * @param contactPhone 
     * @param city 
     * @param companyId 
     * @returns Retorna TRUE se for bem sucedido
     */
    async insert(name:string, cpf:string, photo: string, contactPhone:Array<string>, city:string, companyId: number): Promise<boolean> {
        try{
            const logTitle = "Hospede Cadastrado";
            const logDescription = `O Hospede ${name} foi cadastrado!`;
            const stringSql = "INSERT INTO hospedes VALUES(?,?,?,?,?,?,?,?,?)";

            const connection = await this.getConnection();
            await connection.execute(stringSql,
                [
                    cpf,
                    name,
                    photo,
                    city,
                    contactPhone[0],
                    contactPhone[1],
                    companyId,
                ]
            );
            connection.end();
            LogInteractor.insert(logTitle, logDescription);
 
            return true;
        }catch(error){
            console.log("ERRO");
            console.log(error);
            return false;
        }
    }

    /**
     * Atualiza os dados de um hospede no banco de dados.
     * @param id 
     * @param name 
     * @param cpf 
     * @param photo 
     * @param contactPhone 
     * @param city 
     * @param companyId 
     * @param lastIdAccommodation 
     * @returns 
     */
    async update(id:number, name:string, cpf:string, photo: string, contactPhone:Array<string>, city:string, companyId: number, lastIdAccommodation: number): Promise<any> {
        try{
            const logTitle = "Hospede Atualizado!";
            const logDescription = `O Hospede de ID ${id} foi atualizado.`;
            const stringSql = "UPDATE hospedes SET CPF = ?, nome = ?, foto = ?, cidade = ?, telefoneContatoA = ?, telefoneContatoB = ?, idEmpresa = ?, idUltimaAcomodacao = ? WHERE id = ?;";

            const connection = await this.getConnection();
            await connection.execute(stringSql,
                [
                    cpf,
                    name,
                    photo,
                    city,
                    contactPhone[0],
                    contactPhone[1],
                    companyId,
                    lastIdAccommodation,
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
     * Deleta um hospede do banco de dados
     * @param id 
     * @returns 
     */
    async delete(id: number): Promise<boolean> {
        try{
            const logTitle = "Hospede Deletado!";
            const logDescription = `O Hospede de ID ${id} foi removido.`
            const stringSql = "DELETE FROM hospedes WHERE id = ?";
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
}

export default GuestInteractor;