import { Router, Request, Response } from "express";
import multer from "multer";
import Database from "../Interactor/Database";
import AccommodationRouter from "./AccommodationRouter";
import EmployeeRouter from "./EmployeeRouter";
import GuestRouter from "./GuestRouter";

const database = new Database("mysql","root","Arvorebinaria123","3306","hotel_silveira");
const guestRouter = new GuestRouter(database);
const employeeRouter = new EmployeeRouter(database);
const accommodationRouter = new AccommodationRouter(database);

const router = Router();
const upload = multer();

router.get("/", (request: Request, response: Response) => {
    return response.sendFile("/index.html");
});

// Guest Route
router.get("/guest", upload.none(), guestRouter.get);
router.post("/guest", upload.none() , guestRouter.post);
router.put("/guest", upload.none(), guestRouter.put);
router.delete("/guest", upload.none(), guestRouter.delete);

// Employee Route
router.get("/employee", upload.none(), employeeRouter.get);
router.post("/employee", upload.none(), employeeRouter.post);
router.put("/employee", upload.none(),employeeRouter.put);
router.delete("/employee", upload.none(),employeeRouter.delete);

// Accommodation Route
router.get("/accommodation", upload.none(), accommodationRouter.get);
router.post("/accommodation", upload.none(), accommodationRouter.post);
router.put("/accommodation", upload.none(),accommodationRouter.put);
router.delete("/accommodation", upload.none(),accommodationRouter.delete);

// router.get("/reserve/:id", async (request: Request, response: Response) => {
//     const reserveId = parseInt(request.params.id);
//     const reserve = await reserveInteractor.findByPk(reserveId);
//     const guest = await guestInteractor.findByPk(reserve.getGuestId());
//     const room = await roomInteractor.findByPk(reserve.getroomIdNumber());
//     const employee = await employeeInteractor.findByPk(reserve.getEmployeeId());

//     const data = {
//         reserve: reserve,
//         guest: guest,
//         room: room,
//         employee: employee
//     }

//     if(reserve){
//         return response.status(200).json(data);
//     }
//     else{
//         return response.status(404).json({erro: "Reserva nao encontrada"});
//     }
// });

// router.get("/room/:id", async (request: Request, response: Response) => {
//     const roomId = parseInt(request.params.id);
//     const room = await roomInteractor.findByPk(roomId);

//     if(room){
//         return response.status(200).json(room);
//     }
//     else{
//         return response.status(404).json({erro: "Quarto nao encontrado"});
//     }
// });

export default router;