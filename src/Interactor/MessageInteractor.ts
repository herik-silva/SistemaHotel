import Database from "./Database";
import interactor from "./Interactor";
import { createConnection, Connection } from "mysql2/promise";
import LogInteractor from "./LogInteractor";
import Message from "../Entity/Message";

class MessageInteractor implements interactor {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async getConnection(): Promise<Connection> {
        const connectionUrl = `${this.database.dialect}://${this.database.user}:${this.database.key}@localhost:${this.database.port}/${this.database.database}`;
        const connection = await createConnection(connectionUrl);

        return connection;
    }

    async insert(subject: string, content: string, senderId: number, recipientId: Array<number>): Promise<boolean> {
        try{
            const message = new Message(subject, content, senderId, recipientId);
            const connection = await this.getConnection();
            const logTitle = "Recado Enviado";
            const logDescription = `O recado com o assunto ${message.getSubject()} foi enviado`;
            const stringSql = "INSERT INTO nome_tabela VALUES(?,?,?,?,?)";
            
            connection.execute(stringSql, [
                    message.getSubject(),
                    message.getContent(),
                    message.getSenderId(),
                    message.getRecipientId()
                ]
            );

            connection.end();
            LogInteractor.insert(logTitle, logDescription);

            return true;
        }catch(error){
            return false;
        }
    }

    async update(id: number, subject: string, content: string) {
        try{
            const connection = await this.getConnection();
            const logTitle = "Recado Atualizado";
            const logDescription = `O Recado foi atualizado com o assunto ${subject}`;
            const stringSql = "UPDATE nome_tabela SET assunto = ?, descricao = ? WHERE id = ? ";

            connection.execute(stringSql, [
                    subject,
                    content,
                    id
                ]
            );

            connection.end();
            LogInteractor.insert(logTitle, logDescription);
        }catch(error){
            throw error;
        }
    }

    async delete(id: number) {
        try{
            const connection = await this.getConnection();
            const logTitle = "Recado Deletado";
            const logDescription = "O Recado foi removido do bancoo de dados";
            const stringSql = "DELETE FROM nome_tabela WHERE id = ?";

            connection.execute(stringSql, id);

            connection.end();
            LogInteractor.insert(logTitle, logDescription);
        }catch(error){
            throw error;
        }
    }

    async find(subject: string): Promise<Message> {
        try{
            const connection = await this.getConnection();
            const stringSql = "SELECT * FROM nome_tabela WHERE assunto = ?";

            const row = connection.query(stringSql, subject);
            connection.end();

            if(row[0][0]){
                const messageSelected = row[0][0];
                const message = new Message(
                    messageSelected.assunto,
                    messageSelected.conteudo,
                    messageSelected.idRemetente,
                    messageSelected.idDestinatario
                );

                return message;
            }
        }catch(error){
            throw error;
        }
    }

    async findByPk(senderId: number): Promise<Array<Message>> {
        try{
            const messageList = new Array<Message>();
            const connection = await this.getConnection();
            const stringSql = "SELECT * FROM nome_tabela WHERE id = ?";

            const row = connection.query(stringSql, senderId);
            connection.end();

            if(row[0][0]){
                var index=0;
                const messagesText = row[0];

                while(messagesText[index]){
                    const selectedMessage = messagesText[index];
                    const message = new Message(
                        selectedMessage.assunto,
                        selectedMessage.conteudo,
                        selectedMessage.idRemetente,
                        selectedMessage.idDestinatario
                    );

                    messageList.push(message);
                    index++;
                }
            }

            return messageList;
        }catch(error){
            throw error;
        }
    }
}

export default MessageInteractor;