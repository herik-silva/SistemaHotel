import Interactor from "./Interactor";
import Database from "./Database";
import { createConnection, Connection } from "mysql2/promise";
import ViewReserve from "../Entity/ViewReserve";
import LogInteractor from "./LogInteractor";
import Formater from "../Entity/Formater";

class ReserveInteractor implements Interactor {
    private database: Database;

    constructor(database: Database){
        this.database = database;
    }

    async getConnection(): Promise<Connection> {
        return await createConnection(`${this.database.dialect}://${this.database.user}:${this.database.key}@localhost:${this.database.port}/${this.database.database}`);
    }

    async getLastId(connection: Connection): Promise<number> {
        const sqlString = "SELECT LAST_INSERT_ID()";
        
        const row = await connection.query(sqlString);
        const lastId = row[0][0]["LAST_INSERT_ID()"]
        console.log("Ultimo ID: ", lastId);

        return lastId;
    }

    async find(field: string, value: string): Promise<Array<ViewReserve>> {
        try{
            const stringSql = "SELECT * FROM vwreservas WHERE ? LIKE ?";

            const connection = await this.getConnection();
            const reservesFound = new Array<ViewReserve>();

            const rows = await connection.query(stringSql, [field, value]);
            connection.end();

            if(rows[0][0]){
                var index = 0;
                const reservesText = rows[0];
                while(reservesText[index]){
                    const reserveSelected = reservesText[index];

                    reservesFound.push(new ViewReserve(
                        reserveSelected.id,
                        reserveSelected.dataEntrada,
                        reserveSelected.dataSaida,
                        reserveSelected.qtdePessoas,
                        reserveSelected.fk_numeroQuarto,
                        reserveSelected.fk_idHospede,
                        reserveSelected.fk_idFuncionario,
                        reserveSelected.statusCheckin,
                        reserveSelected.contadorCheckin,
                        reserveSelected.idFormaPagamento,
                        reserveSelected.observacoes,
                        reserveSelected.nomeHospede,
                        reserveSelected.nomeFuncionario,
                        reserveSelected.fotoHospede,
                        reserveSelected.fotoQuarto,
                        Formater.formatContactPhone(reserveSelected.telContato),
                        reserveSelected.ultimoCheckin
                    ));

                    index++;
                }
            }

            return reservesFound;
        }
        catch(error){
            throw error;
        }
    }

    async findByPk(id: number): Promise<ViewReserve> {
        try{
            const stringSql = "SELECT * FROM vwreservas WHERE id = ?";
            
            const connection = await this.getConnection();
            const rows = await connection.query(stringSql, id);
            connection.end();

            if(rows[0][0]){
                const reserveSelected = rows[0][0];

                return new ViewReserve(
                    reserveSelected.id,
                    reserveSelected.dataEntrada,
                    reserveSelected.dataSaida,
                    reserveSelected.qtdePessoas,
                    reserveSelected.fk_numeroQuarto,
                    reserveSelected.fk_idHospede,
                    reserveSelected.fk_idFuncionario,
                    reserveSelected.statusCheckin,
                    reserveSelected.contadorCheckin,
                    reserveSelected.idFormaPagamento,
                    reserveSelected.observacoes,
                    reserveSelected.nomeHospede,
                    reserveSelected.nomeFuncionario,
                    reserveSelected.fotoHospede,
                    reserveSelected.fotoQuarto,
                    reserveSelected.telContato,
                    reserveSelected.ultimoCheckin
                );
            }
        }
        catch(error){
            throw error;
        }
    }

    async insert(entryDate: Date, checkoutDate: Date, amountPeople: number, roomId: number, guestId: number, employeeId: number, status: boolean, checkinAmount: number, observation: string = "", payment: number=undefined): Promise<number> {
        try{
            const logTitle = "Reserva Cadastrada";
            const logDescription = `A reserva do quarto ${roomId} foi realizada`;
            const stringSql = "INSERT INTO reserva(dataEntrada,dataSaida,idFormaPagamento,qtdePessoas,fk_idFuncionario,fk_idHospede,fk_numeroQuarto,contadorCheckin,statusCheckin, observacoes) VALUES(?,?,?,?,?,?,?,?,?,?)";
            const roomUpdate = "UPDATE quartos SET statusAtual = 'Ocupado' WHERE numero = ?";
            const connection = await this.getConnection();
            const fields = [
                entryDate,
                checkoutDate,
                payment,
                amountPeople,
                employeeId,
                guestId,
                roomId,
                checkinAmount,
                status,
                observation,
            ];

            await connection.execute(stringSql, fields);
            const lastId = await this.getLastId(connection);
            await connection.execute(roomUpdate, [roomId]);

            connection.end();
            LogInteractor.insert(logTitle, logDescription);

            return lastId;
        }
        catch(error){
            throw error;
        }
    }

    async update(id: number, entryDate: Date, checkoutDate: Date, amountPeople: number, roomId: number, guestId: number, employeeId: number, status: boolean, checkinAmount: number, payment: number, observation): Promise<boolean> {
        try{
            console.log("Atualizando");
            const logTitle = "Reserva Atualizada!";
            const logDescription = `A reserva de ID ${id} foi atualizada.`
            const stringSql = "UPDATE reserva SET dataEntrada = ?, dataSaida = ?, idFormaPagamento = ?, qtdePessoas = ?, fk_idFuncionario = ?, fk_idHospede = ?, fk_numeroQuarto = ?, contadorCheckin = ?, statusCheckin = ?, observacao = ? WHERE id = ?";
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
            LogInteractor.insert(logTitle, logDescription);

            return true;
        }
        catch(error){
            throw error;
        }
    }

    async makeCheckin(reserveId: number, status: string, checkinAmount: number, lastCheckin: string): Promise<boolean> {
        try {
            const logTitle = "Reserva Atualizada!";
            const logDescription = `Checkin realizado na reserva de ID ${reserveId}.`
            const stringSql = "UPDATE reserva SET statusCheckin = ?,contadorCheckin = ?, ultimoCheckin = ? WHERE id = ?";
            const connection = await this.getConnection();
            console.log(`${reserveId} - ${status} - ${checkinAmount}`);
    
            await connection.execute(stringSql, [status, checkinAmount, lastCheckin,reserveId]);
            console.log("OK");
            connection.end();
            LogInteractor.insert(logTitle, logDescription);
    
            return true;
        }
        catch(error){
            console.log(error)
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        try{
            const logTitle = "Reserva Deletada!";
            const logDescription = `A reserva de  ID ${id} foi removida.`;
            const stringSql = "DELETE FROM reserva WHERE id = ?";
            const connection = await this.getConnection();
            
            await connection.execute(stringSql, [id]);
            connection.end();
            LogInteractor.insert(logTitle, logDescription);
            
            return true;
        }
        catch(error){
            throw error;
        }
    }
}

export default ReserveInteractor;