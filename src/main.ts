import Validator from "./Entity/Validator";

const isValid = Validator.validateCNPJ("14.572.457.0001-85.");
console.log(isValid);
if(isValid){
    console.log("VALIDO");
}
else{
    console.log("INVALIDO");
}
// import { readFileSync } from "fs";
// var data = readFileSync(`${__dirname}/../CPFs.txt`).toString("utf-8");
// while(data.includes("\r")){
//     data = data.replace("\r", "");
// }
// const cpfList = data.split("\n");

// const initialTime = Date.now();

// var validCount = 0;
// var invalidCount = 0;
// for(let cpf of cpfList){
//     const isValid = Validator.validateCPF(cpf);
//     if(isValid){
//         validCount++;
//     }
//     else{
//         invalidCount++;
//     }
// }

// const duration = Date.now() - initialTime;

// console.log(`Validos: ${validCount}\n\nInvalidos: ${invalidCount}\n\nTempo gasto para análise de ${cpfList.length} CPFs -> ${duration}ms`);