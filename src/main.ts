import Server from "./Server";
import Accommodation from "./Entity/Accommodation";
import AccommodationInteractor from "./Interactor/AccommodationInteractor";
import Database from "./Interactor/Database";

const server = new Server(3000);
const database = new Database("mysql","root","Arvorebinaria123","3306","hotel_silveira");

// accommodationInteractor.insert(accommodation.getId(), accommodation.getDescription(), accommodation.getDailyPrice());
server.initServer();