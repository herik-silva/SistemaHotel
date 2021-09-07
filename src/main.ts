import AccommodationInteractor from "./Interactor/AccommodationInteractor";
import Database from "./Interactor/Database";
import GuestInteractor from "./Interactor/GuestInteractor";
import RoomInteractor from "./Interactor/RoomInteractor";

const database = new Database("mysql","root","Arvorebinaria123","3306","hotelsilveira");

const guestInteractor = new GuestInteractor(database);
const acommodationInteractor = new AccommodationInteractor(database);
const roomInteractor = new RoomInteractor(database);

// acommodationInteractor.insert(3,"Quarto de Casal", 150);
// acommodationInteractor.update(1,"Quarto de solteiro", 150).then(value => {
//     acommodationInteractor.findByPk(1).then(value => console.log(value));
// });
// acommodationInteractor.find("Suite").then(value => console.log(value));
// acommodationInteractor.delete(1);

roomInteractor.update(2,null,"ocupado",2);

// guestInteractor.insert(2, "Roberto Cornão Jr", "00234567800", null, ["90907070","90902461"], "Bambui", null, null);
// guestInteractor.update(1, "Roberto Cornão", "12345678997", null, ["98765412","90905412"], "Bambui", null, null);
// guestInteractor.findByPk(1).then(value=>console.log(value));
// guestInteractor.find("Roberto Cornão").then(value => console.log(value));
// guestInteractor.delete(1);