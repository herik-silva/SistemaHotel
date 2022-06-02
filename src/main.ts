import Accommodation from "./Entity/Accommodation";
import Guest from "./Entity/Guest";
import AccommodationInteractor from "./Interactor/AccommodationInteractor";
import Database from "./Interactor/Database";
import GuestInteractor from "./Interactor/GuestInteractor";
import Server from "./Server";

const database = new Database("mysql","root","Arvorebinaria123","3306","hotel_silveira");
const server = new Server(3000);

const guestInteractor = new GuestInteractor(database);
const accommodationInteractor = new AccommodationInteractor(database);

server.initServer();

const accommodation = new Accommodation(0, "Solteiro", 100);

accommodationInteractor.insert(accommodation.getId(), accommodation.getDescription(), accommodation.getDailyPrice());
