import { createConnection, Connection } from "mysql2/promise";

class Database {
    private dialect: string;
    private user: string;
    private key: string;
    private port: string;
    private database: string;

    constructor(dialect: string = process.env.DIALECT, user:string = process.env.USER, key:string = process.env.KEY, port:string = process.env.PORT, database:string = process.env.DATABASE){
        this.dialect = dialect;
        this.user = user;
        this.key = key;
        this.port = port;
        this.database = database;
    }

    public async getConnection(): Promise<Connection> {
        const connectionUri = `${this.dialect}://${this.user}:${this.key}@localhost:${this.port}/${this.database}`;

        return await createConnection(connectionUri);
    }

    public async getLastId(connection: Connection): Promise<number> {
        const sqlString = "SELECT LAST_INSERT_ID()";
        const row = await connection.query(sqlString);
        const lastId = row[0][0]["LAST_INSERT_ID()"]
        
        return lastId;
    }
}

export default Database;