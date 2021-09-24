import { Router, Request, Response } from "express";
import AccommodationInteractor from "../Interactor/AccommodationInteractor";
import Database from "../Interactor/Database";
import GuestInteractor from "../Interactor/GuestInteractor";
import RoomInteractor from "../Interactor/RoomInteractor";
import EmployeeInteractor from "../Interactor/EmployeeInteractor";
import ResponsabilityInteractor from "../Interactor/ResponsabilityInteractor";
import CompanyInteractor from "../Interactor/CompanyInteractor";
import ReserveInteractor from "../Interactor/ReserveInteractor";

const database = new Database("mysql","root","Arvorebinaria123","3306","hotelsilveira");

const guestInteractor = new GuestInteractor(database);
const accommodationInteractor = new AccommodationInteractor(database);
const roomInteractor = new RoomInteractor(database);
const employeeInteractor = new EmployeeInteractor(database);
const responsabilityInteractor = new ResponsabilityInteractor(database);
const companyInteractor = new CompanyInteractor(database); 
const reserveInteractor = new ReserveInteractor(database);

const router = Router();

router.get("/", (request: Request, response: Response) => {
    return response.sendFile("/index.html");
});

router.get("/guest", async (request: Request, response: Response) => {
    const guestId = parseInt(request.body.id);
    const guest = await guestInteractor.findByPk(guestId);
    
    if(guest){
        return response.json(guest);
    }
    else{
        return response.json({erro: "Hospede nao encontrado"});
    }
});

router.get("/employee", async (request: Request, response: Response) => {
    const employeeId = parseInt(request.body.id);
    const employee = await employeeInteractor.findByPk(employeeId);

    if(employee){
        return response.json(employee);
    }
    else{
        return response.json({erro: "Funcionario nao encontrado"});
    }
});

router.get("/accommodation/:id", async (request: Request, response: Response) => {
    const accommodationId = parseInt(request.params.id);
    const accommodation = await accommodationInteractor.findByPk(accommodationId);

    if(accommodation){
        return response.json(accommodation);
    }
    else{
        return response.status(404).json({erro: "Acomodacao nao encontrada"});
    }
});

router.get("/reserve", async (request: Request, response: Response) => {
    const reserveId = parseInt(request.body.id);
    const reserve = await reserveInteractor.findByPk(reserveId);
    const guest = await guestInteractor.findByPk(reserve.getGuestId());
    const room = await roomInteractor.findByPk(reserve.getroomIdNumber());
    const employee = await employeeInteractor.findByPk(reserve.getEmployeeId());

    const data = {
        reserve: reserve,
        guest: guest,
        room: room,
        employee: employee
    }

    if(reserve){
        return response.status(200).json(data);
    }
    else{
        return response.status(404).json({erro: "Reserva nao encontrada"});
    }
});

router.get("/room", async (request: Request, response: Response) => {
    const roomId = parseInt(request.body.id);
    const room = await roomInteractor.findByPk(roomId);

    if(room){
        return response.status(200).json(room);
    }
    else{
        return response.status(404).json({erro: "Quarto nao encontrado"});
    }
});

export default router;