import { Router, Request, Response } from "express";
import multer from "multer";
import Database from "../Interactor/Database";
import GuestRouter from "./GuestRouter";

const database = new Database("mysql","root","Arvorebinaria123","3306","hotel_silveira");
const guestRouter = new GuestRouter(database);

const router = Router();
const upload = multer();

router.get("/", (request: Request, response: Response) => {
    return response.sendFile("/index.html");
});

router.get("/guest", guestRouter.get);
router.post("/guest", upload.none() ,guestRouter.post);

// router.get("/employee", async (request: Request, response: Response) => {
//     const employeeId = parseInt(request.body.id);
//     const employee = await employeeInteractor.findByPk(employeeId);

//     if(employee){
//         return response.json(employee);
//     }
//     else{
//         return response.json({erro: "Funcionario nao encontrado"});
//     }
// });

// router.get("/accommodation/:id", async (request: Request, response: Response) => {
//     const accommodationId = parseInt(request.params.id);
//     const accommodation = await accommodationInteractor.findByPk(accommodationId);

//     if(accommodation){
//         return response.json(accommodation);
//     }
//     else{
//         return response.status(404).json({erro: "Acomodacao nao encontrada"});
//     }
// });

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