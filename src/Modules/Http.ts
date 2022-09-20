import { Response } from "express";

class Http {
    
    static sendResponse(response: Response, status: number, message: any = undefined) {
        response.statusCode = status;
        response.json(message);
    }
}

export default Http;