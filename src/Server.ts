import express, { Express } from "express";
import router from "./Routers/routes";
import cors from "cors";

class Server {
    private port: number;
    private app: Express;
    
    constructor(newPort: number) {
        this.port = newPort || parseInt(process.env.PORT);
        this.app = express();
    }

    initServer(port: number = this.port): void {
        const corsOptions = {
            origin: "*",
            optionsSucessStatus: 200
        }

        this.app.use(express.static(__dirname+"/pages"));
        this.app.use(router);
        this.app.use(cors(corsOptions));
        
        this.app.listen(port, ()=> {
            console.log(`http://localhost:${this.port}`);
        });
    }
}

export default Server;