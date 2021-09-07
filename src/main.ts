import Database from "./Interactor/Database";
import GuestInteractor from "./Interactor/GuestInteractor";

const database = new Database("mysql","root","Arvorebinaria123","3306","hotelsilveira");

const guestInteractor = new GuestInteractor(database);

// guestInteractor.insert(2, "Roberto Cornão Jr", "00234567800", null, ["90907070","90902461"], "Bambui", null, null);
// guestInteractor.update(1, "Roberto Cornão", "12345678997", null, ["98765412","90905412"], "Bambui", null, null);
// guestInteractor.findByPk(1).then(value=>console.log(value));
guestInteractor.find("Roberto Cornão").then(value => console.log(value));
// guestInteractor.delete(1);