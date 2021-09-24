import Interactor from "./Interactor";
import Database from "./Database";
import Company from "../Entity/Company";
import { createConnection, Connection } from "mysql2/promise";

class CompanyInteractor implements  Interactor {
    private database: Database;

    constructor(database: Database){
        this.database = database;
    }

    async getConnection(): Promise<Connection> {
        return await createConnection(`${this.database.dialect}://${this.database.user}:${this.database.key}@localhost:${this.database.port}/${this.database.database}`);
    }

    async insert(id: number, cnpj: string, email: string, name: string, contactPhone: string): Promise<boolean> {
        try{
            const stringSql = "INSERT INTO empresas VALUES(?,?,?,?,?)";

            const connection = await this.getConnection();
            await connection.execute(stringSql,
                [
                    id,
                    cnpj,
                    email,
                    name,
                    contactPhone
                ]
            );
            connection.end();

            return true;
        }
        catch(error){
            throw error;
        }
    }

    async findByPk(id: number): Promise<Company> {
        try{
            const stringSql = "SELECT * FROM empresas WHERE id = ?";

            const connection = await this.getConnection();
            const row = await connection.query(stringSql, id);

            if(row[0][0]){
                const companySelected = row[0][0];

                return new Company(
                    companySelected.id,
                    companySelected.CNPJ,
                    companySelected.email,
                    companySelected.nome,
                    companySelected.telefoneContato
                );
            }
        }
        catch(error){
            throw error;
        }
    }

    async find(field: string, value: string): Promise<Array<Company>> {
        try{
            const stringSql = `SELECT * FROM empresas WHERE ${field} LIKE "${value}%"`;

            const connection = await this.getConnection();
            const companiesFound = new Array<Company>();

            const rows = await connection.query(stringSql);

            if(rows[0][0]){
                var index = 0;
                const companiesText = rows[0];

                while(companiesFound[index]){
                    const companySelected = companiesText[index];

                    companiesFound.push(new Company(
                        companySelected.id,
                        companySelected.CNPJ,
                        companySelected.email,
                        companySelected.nome,
                        companySelected.telefoneContato
                    ));
                }

                connection.end();
            }

            return companiesFound;
        }
        catch(error){
            throw error;
        }
    }

    async update(id: number, cnpj: string, name: string, email:string, contactPhone: string): Promise<boolean> {
        try{
            const stringSql = "UPDATE empresas SET CNPJ = ?, nome = ?, email = ?, telefoneContato = ? WHERE id = ?";

            const connection = await this.getConnection();
            await connection.execute(stringSql, 
                [
                    cnpj,
                    name,
                    email,
                    contactPhone,
                    id
                ]
            );
            connection.end();

            return true;
        }
        catch(error){
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            const stringSql = "DELETE FROM empresas WHERE id = ?";
            
            const connection = await this.getConnection();
            await connection.execute(stringSql, id);
            connection.end();

            return true;
        }
        catch(error){
            throw error;
        }
    }
}

export default CompanyInteractor;