import interactor from "./Interactor";

class GuestInteractor implements interactor {
    async getConnection(): Promise<any> {}
    async find(): Promise<any> {}
    async findByPk(): Promise<any> {}
    async insert(): Promise<any> {}
    async update(): Promise<any> {}
    async delete(): Promise<any> {}
}

export default GuestInteractor;