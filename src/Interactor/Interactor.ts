interface interactor {
    getConnection(): Promise<any>;

    insert(...args): Promise<boolean>;
    findByPk(id: number): Promise<any>;
    find(...args): Promise<any>;
    update(...args): Promise<any>;
    delete(id: number): Promise<any>;
}

export default interactor;