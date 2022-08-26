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

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "src/pages/uploads/");
    },
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage });

router.get("/", (request: Request, response: Response) => {
    return response.sendFile("/Hotel Silveira - Interfaces.pdf");
});

router.get("/pdf", (request: Request, response: Response) => {
    return response.download(`${__dirname}/../pages/Hotel Silveira - Interfaces.pdf`);
});

// Guest Route
router.get("/guest/:id", upload.none(), async(req, res) => {
    return await guestRouter.get(req, res)
});
router.post("/guest", upload.none(), async(req, res) => {
    return await guestRouter.post(req, res);
});
router.put("/guest", upload.none(), async(req, res) => {
    return await guestRouter.put(req, res);
});
router.delete("/guest", upload.none(), guestRouter.delete);

// Employee Route
router.get("/employee", upload.none(), employeeRouter.get);
router.post("/employee", upload.none(), employeeRouter.post);
router.put("/employee", upload.none(), employeeRouter.put);
router.delete("/employee", upload.none(), employeeRouter.delete);

// Accommodation Route
router.get("/accommodation/:id", upload.none(), async(req, res)=>{
    return await accommodationRouter.get(req, res);
});
router.post("/accommodation", upload.none(), async(req, res)=>{
    return await accommodationRouter.post(req, res);
});
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
router.get("/room/:number", upload.none(), async(req, res)=>{
    return await roomRouter.get(req, res);
});
router.post("/room", upload.single("image"), async(req, res)=>{
    return await roomRouter.post(req, res);
});
router.put("/room", upload.single("image"), async(req, res)=>{
    return await roomRouter.put(req, res);
});

router.delete("/room/:number", upload.none(), async(req, res) => {
    return await roomRouter.delete(req, res);
});

// Responsability Route
router.get("/responsability/:id", upload.none(), async(req, res) => {
    return await responsabilityRouter.get(req, res);
});
router.post("/responsability", upload.none(), responsabilityRouter.post);
router.put("/responsability", upload.none(), responsabilityRouter.put);
router.delete("/responsability", upload.none(), responsabilityRouter.delete);

// Responsability Route
router.get("/reserve/:id", upload.none(), async(req, res) => {
    return await reserveRouter.get(req, res);
});
router.post("/reserve", upload.none(), async(req, res) => {
    return await reserveRouter.post(req, res);
});
router.put("/reserve/:option", upload.none(), async(req, res) => {
    console.log("Atualizar reserva");
    return await reserveRouter.put(req, res);
});

router.delete("/reserve", upload.none(), reserveRouter.delete);

// Authenticate Route
router.post("/authenticate", upload.none(), async(req, res) => {
    return await authenticateRouter.post(req, res);
});

export default router;