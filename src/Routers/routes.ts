import { Router, Request, Response } from "express";
import multer from "multer";
import Database from "../Interactor/Database";
import AccommodationRouter from "./AccommodationRouter";
import AuthenticateRouter from "./AuthenticateRouter";
import CompanyRouter from "./CompanyRouter";
import EmployeeRouter from "./EmployeeRouter";
import GuestRouter from "./GuestRouter";
import MessageRouter from "./MessageRouter";
import ReserveRouter from "./ReserveRouter";
import ResponsabilityRouter from "./Responsability";
import RoomRouter from "./RoomRouter";

const database = new Database("mysql","root","Arvorebinaria123","3306","hotel_silveira");

const guestRouter = new GuestRouter(database);
const employeeRouter = new EmployeeRouter(database);
const accommodationRouter = new AccommodationRouter(database);
const companyRouter = new CompanyRouter(database);
const messageRouter = new MessageRouter(database);
const roomRouter = new RoomRouter(database);
const responsabilityRouter = new ResponsabilityRouter(database);
const reserveRouter = new ReserveRouter(database);
const authenticateRouter = new AuthenticateRouter(database);

const router = Router();
const upload = multer();

router.get("/", (request: Request, response: Response) => {
    return response.sendFile("/index.html");
});

// Guest Route
router.get("/guest", upload.none(), guestRouter.get);
router.post("/guest", upload.none(), guestRouter.post);
router.put("/guest", upload.none(), guestRouter.put);
router.delete("/guest", upload.none(), guestRouter.delete);

// Employee Route
router.get("/employee", upload.none(), employeeRouter.get);
router.post("/employee", upload.none(), employeeRouter.post);
router.put("/employee", upload.none(), employeeRouter.put);
router.delete("/employee", upload.none(), employeeRouter.delete);

// Accommodation Route
router.get("/accommodation", upload.none(), accommodationRouter.get);
router.post("/accommodation", upload.none(), accommodationRouter.post);
router.put("/accommodation", upload.none(), accommodationRouter.put);
router.delete("/accommodation", upload.none(), accommodationRouter.delete);

// Company Route
router.get("/company", upload.none(), companyRouter.get);
router.post("/company", upload.none(), companyRouter.post);
router.put("/company", upload.none(), companyRouter.put);
router.delete("/company", upload.none(), companyRouter.delete);

// Message Route
router.get("/message", upload.none(), messageRouter.get);
router.post("/message", upload.none(), messageRouter.post);
router.put("/message", upload.none(), messageRouter.put);
router.delete("/message", upload.none(), messageRouter.delete);

// Company Route
router.get("/company", upload.none(), companyRouter.get);
router.post("/company", upload.none(), companyRouter.post);
router.put("/company", upload.none(), companyRouter.put);
router.delete("/company", upload.none(), companyRouter.delete);

// Room Route
router.get("/room", upload.none(), roomRouter.get);
router.post("/room", upload.none(), roomRouter.post);
router.put("/room", upload.none(), roomRouter.put);
router.delete("/room", upload.none(), roomRouter.delete);

// Responsability Route
router.get("/responsability", upload.none(), responsabilityRouter.get);
router.post("/responsability", upload.none(), responsabilityRouter.post);
router.put("/responsability", upload.none(), responsabilityRouter.put);
router.delete("/responsability", upload.none(), responsabilityRouter.delete);

// Responsability Route
router.get("/reserve", upload.none(), reserveRouter.get);
router.post("/reserve", upload.none(), reserveRouter.post);
router.put("/reserve", upload.none(), reserveRouter.put);
router.delete("/reserve", upload.none(), reserveRouter.delete);

// Authenticate Route
router.post("/authenticate", upload.none(), authenticateRouter.post);

export default router;