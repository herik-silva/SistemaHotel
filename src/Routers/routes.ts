import { Router, Request, Response } from "express";
import multer from "multer";

import Database from "../Modules/Database";
import AccommodationRouter from "./AccommodationRouter";
import EmployeeRouter from "./EmployeeRouter";
import GuestRouter from "./GuestRouter";
import ReserveRouter from "./ReserveRouter";
import RoleRouter from "./RoleRouter";
import RoomRouter from "./RoomRouter";

const database = new Database("mysql","root","Arvorebinaria123","3306","hotel_silveira");
const accommodationRouter = new AccommodationRouter(database);
const roomRouter = new RoomRouter(database);
const reserveRouter = new ReserveRouter(database);
const guestRouter = new GuestRouter(database);
const roleRouter = new RoleRouter(database);
const employeeRouter = new EmployeeRouter(database);

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
    await accommodationRouter.get(request, response);
});

router.post("/accommodation", upload.none(), async (request: Request, response: Response) => {
    await accommodationRouter.post(request, response);
});

router.put("/accommodation", upload.none(),async (request: Request, response: Response) => {
    await accommodationRouter.put(request, response);
});

router.delete("/accommodation/:id", upload.none(), async (request: Request, response: Response) => {
    await accommodationRouter.delete(request, response);
});

router.get("/room/:id", upload.none(), async (request: Request, response: Response) => {
    await roomRouter.get(request, response);
});

router.post("/room", upload.none(), async (request: Request, response: Response) => {
    await roomRouter.post(request, response);
});

router.put("/room", upload.none(),async (request: Request, response: Response) => {
    await roomRouter.put(request, response);
});

router.delete("/room/:id", upload.none(), async (request: Request, response: Response) => {
    await roomRouter.delete(request, response);
});

router.get("/reserve/:id", upload.none(), async (request: Request, response: Response) => {
    await reserveRouter.get(request, response);
});

router.post("/reserve", upload.none(), async (request: Request, response: Response) => {
    await reserveRouter.post(request, response);
});

router.put("/reserve", upload.none(),async (request: Request, response: Response) => {
    await reserveRouter.put(request, response);
});

router.delete("/reserve/:id", upload.none(), async (request: Request, response: Response) => {
    await reserveRouter.delete(request, response);
});

router.get("/guest/:id", upload.none(), async (request: Request, response: Response) => {
    await guestRouter.get(request, response);
});

router.post("/guest", upload.none(), async (request: Request, response: Response) => {
    await guestRouter.post(request, response);
});

router.put("/guest", upload.none(),async (request: Request, response: Response) => {
    await guestRouter.put(request, response);
});

router.delete("/guest/:id", upload.none(), async (request: Request, response: Response) => {
    await guestRouter.delete(request, response);
});

router.get("/role/:id", upload.none(), async (request: Request, response: Response) => {
    await roleRouter.get(request, response);
});

router.post("/role", upload.none(), async (request: Request, response: Response) => {
    await roleRouter.post(request, response);
});

router.put("/role", upload.none(),async (request: Request, response: Response) => {
    await roleRouter.put(request, response);
});

router.delete("/role/:id", upload.none(), async (request: Request, response: Response) => {
    await roleRouter.delete(request, response);
});

router.get("/employee/:id", upload.none(), async (request: Request, response: Response) => {
    await employeeRouter.get(request, response);
});

router.post("/employee", upload.none(), async (request: Request, response: Response) => {
    await employeeRouter.post(request, response);
});

router.put("/employee", upload.none(),async (request: Request, response: Response) => {
    await employeeRouter.put(request, response);
});

router.delete("/employee/:id", upload.none(), async (request: Request, response: Response) => {
    await employeeRouter.delete(request, response);
});

export default router;