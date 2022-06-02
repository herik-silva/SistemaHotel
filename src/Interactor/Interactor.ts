import Database from "./Database";

interface interactor {
    getConnection(database: any | Database): any;

    insert(...args): any;
    findByPk(id: number): any;
    find(...args): any;
    update(...args): any;
    delete(id: number): any;
}

export default interactor;