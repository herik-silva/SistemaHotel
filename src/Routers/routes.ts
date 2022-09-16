import { Router, Request, Response } from "express";
import multer from "multer";

import Database from "../Modules/Database";
import AccommodationRouter from "./AccommodationRouter";
import GuestRouter from "./GuestRouter";
import ReserveRouter from "./ReserveRouter";
import RoomRouter from "./RoomRouter";

const database = new Database("mysql","root","Arvorebinaria123","3306","hotel_silveira");
const accommodationRouter = new AccommodationRouter(database);
const roomRouter = new RoomRouter(database);
const reserveRouter = new ReserveRouter(database);
const guestRouter = new GuestRouter(database);

const router = Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "src/pages/uploads/");
    },
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage });

router.get("/accommodation/:id", upload.none(), async (request: Request, response: Response) => {
    return await accommodationRouter.get(request, response);
});

router.post("/accommodation", upload.none(), async (request: Request, response: Response) => {
    return await accommodationRouter.post(request, response);
});

router.put("/accommodation", upload.none(),async (request: Request, response: Response) => {
    return await accommodationRouter.put(request, response);
});

router.delete("/accommodation/:id", upload.none(), async (request: Request, response: Response) => {
    return await accommodationRouter.delete(request, response);
});

router.get("/room/:id", upload.none(), async (request: Request, response: Response) => {
    return await roomRouter.get(request, response);
});

router.post("/room", upload.none(), async (request: Request, response: Response) => {
    return await roomRouter.post(request, response);
});

router.put("/room", upload.none(),async (request: Request, response: Response) => {
    return await roomRouter.put(request, response);
});

router.delete("/room/:id", upload.none(), async (request: Request, response: Response) => {
    return await roomRouter.delete(request, response);
});

router.get("/reserve/:id", upload.none(), async (request: Request, response: Response) => {
    return await reserveRouter.get(request, response);
});

router.post("/reserve", upload.none(), async (request: Request, response: Response) => {
    return await reserveRouter.post(request, response);
});

router.put("/reserve", upload.none(),async (request: Request, response: Response) => {
    return await reserveRouter.put(request, response);
});

router.delete("/reserve/:id", upload.none(), async (request: Request, response: Response) => {
    return await reserveRouter.delete(request, response);
});

router.get("/guest/:id", upload.none(), async (request: Request, response: Response) => {
    return await guestRouter.get(request, response);
});

router.post("/guest", upload.none(), async (request: Request, response: Response) => {
    return await guestRouter.post(request, response);
});

router.put("/guest", upload.none(),async (request: Request, response: Response) => {
    return await guestRouter.put(request, response);
});

router.delete("/guest/:id", upload.none(), async (request: Request, response: Response) => {
    return await guestRouter.delete(request, response);
});

export default router;