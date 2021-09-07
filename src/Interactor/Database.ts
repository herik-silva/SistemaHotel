class Database {
    public dialect: string;
    public user: string;
    public key: string;
    public port: string;
    public database: string;

    constructor(dialect: string = process.env.DIALECT, user:string = process.env.USER, key:string = process.env.KEY, port:string = process.env.PORT, database:string = process.env.DATABASE){
        this.dialect = dialect;
        this.user = user;
        this.key = key;
        this.port = port;
        this.database = database;
    }

}

export default Database;