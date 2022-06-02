import LogInteractor from "./Interactor/LogInteractor";

const logInteractor = new LogInteractor("../../logs/log.txt");

logInteractor.insert("Usuário não inserido", "Erro ao tentar inserir um funcionário")