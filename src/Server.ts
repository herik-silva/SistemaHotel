import express, { Express } from "express";
import router from "./router/routes";
import cors from "cors";

class Server {
    private port: number;
    private app: Express;
    
    constructor(newPort: number) {
        this.port = newPort || parseInt(process.env.PORT);
        this.app = express();
    }

    initServer(port: number = this.port): void {
        this.app.use(express.static(__dirname+"/page"));
        this.app.use(router);
        this.app.use(cors);
        
        this.app.listen(port, ()=> {
            console.log(`http://localhost:${this.port}`);
        });
    }
}

export default Server;