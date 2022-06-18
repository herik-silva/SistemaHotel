import StatusApp from "./StatusApp"
import Status from "./StatusApp"

abstract class Status {
    public static ER_DUP_ENTRY: StatusApp = {
        code: 506,
        description: "Entrada duplicada"
    }

    public static NOT_FOUND: StatusApp = {
        code: 404,
        description: "Não encontrado"
    }

    public static OK: StatusApp = {
        code: 200,
        description: "Sucesso"
    }
}

export default Status;