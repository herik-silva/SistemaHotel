import Interactor from "./Interactor";
import Database from "./Database";
import { createConnection, Connection } from "mysql2/promise";
import Reserve from "../Entity/Reserve";

class ReserveInteractor implements Interactor {
    private database: Database;

    constructor(database: Database){
        this.database = database;
    }

    async getConnection(): Promise<Connection> {
        return await createConnection(`${this.database.dialect}://${this.database.user}:${this.database.key}@localhost:${this.database.port}/${this.database.database}`);
    }

    async find(field: string, value: string): Promise<Array<Reserve>> {
        try{
            const stringSql = `SELECT * FROM reservas WHERE ${field} LIKE "${value}%"`;

            const connection = await this.getConnection();
            const reservesFound = new Array<Reserve>();

            const rows = await connection.query(stringSql);
            connection.end();

            if(rows[0][0]){
                var index = 0;
                const reservesText = rows[0];

                while(reservesText[index]){
                    const reserveSelected = reservesText[index];

                    reservesFound.push(new Reserve(
                        reserveSelected.id,
                        reserveSelected.dataEntrada,
                        reserveSelected.dataSaida,
                        reserveSelected.qtdePessoas,
                        reserveSelected.fk_numeroQuarto,
                        reserveSelected.fk_idHospede,
                        reserveSelected.fk_idFuncionario,
                        reserveSelected.statusCheckin,
                        reserveSelected.contadorCheckin,
                        reserveSelected.idFormaPagamento
                    ));
                }
            }

            return reservesFound;
        }
        catch(error){
            throw error;
        }
    }

    async findByPk(id: number): Promise<Reserve> {
        try{
            const stringSql = "SELECT * FROM reservas WHERE id = ?";
            
            const connection = await this.getConnection();
            const rows = await connection.query(stringSql, id);
            connection.end();

            if(rows[0][0]){
                const reserveSelected = rows[0][0];

                return new Reserve(
                    reserveSelected.id,
                    reserveSelected.dataEntrada,
                    reserveSelected.dataSaida,
                    reserveSelected.qtdePessoas,
                    reserveSelected.fk_numeroQuarto,
                    reserveSelected.fk_idHospede,
                    reserveSelected.fk_idFuncionario,
                    reserveSelected.statusCheckin,
                    reserveSelected.contadorCheckin,
                    reserveSelected.idFormaPagamento
                );
            }
        }
        catch(error){
            throw error;
        }
    }

    async insert(id: number, entryDate: Date, checkoutDate: Date, amountPeople: number, roomId: number, guestId: number, employeeId: number, status: boolean, checkinAmount: number, payment: number): Promise<boolean> {
        try{
            const stringSql = "INSERT INTO reservas VALUES(?,?,?,?,?,?,?,?,?,?)";

            const connection = await this.getConnection();
            await connection.execute(stringSql,
                [
                    id,
                    entryDate,
                    checkoutDate,
                    payment,
                    amountPeople,
                    employeeId,
                    guestId,
                    roomId,
                    checkinAmount,
                    status
                ]
            );
            connection.end();

            return true;
        }
        catch(error){
            throw error;
        }
    }

    async update(id: number, entryDate: Date, checkoutDate: Date, amountPeople: number, roomId: number, guestId: number, employeeId: number, status: boolean, checkinAmount: number, payment: number): Promise<boolean> {
        try{
            const stringSql = "UPDATE reservas SET dataEntrada = ?, dataSaida = ?, idFormaPagamento = ?, qtdePessoas = ?, fk_idFuncionario = ?, fk_idHospede = ?, fk_numeroQuarto = ?, contadorCheckin = ?, statusCheckin = ? WHERE id = ?";

            const connection = await this.getConnection();
            await connection.execute(stringSql,
                [
                    entryDate,
                    checkoutDate,
                    payment,
                    amountPeople,
                    employeeId,
                    guestId,
                    roomId,
                    checkinAmount,
                    status,
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
            const stringSql = "DELETE FROM reservas WHERE id = ?";
            
            const connection = await this.getConnection();
            await connection.execute(stringSql, [id]);
            connection.end();

            return true;
        }
        catch(error){
            throw error;
        }
    }
}

export default ReserveInteractor;