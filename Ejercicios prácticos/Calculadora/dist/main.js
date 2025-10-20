"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const operaciones_1 = require("./src/operaciones");
const operaciones_2 = require("./src/operaciones");
const prompt = (0, prompt_sync_1.default)();
console.log(" ~ Calculadora ~");
const a = Number(prompt("Ingrese el primer número: "));
const b = Number(prompt("Ingrese el segundo número: "));
const operacion = prompt("Ingrese el operador ( *, /, -, +):  ");
let calculadora;
switch (operacion) {
    case "+":
        calculadora = new operaciones_1.Calculadora(new operaciones_2.Suma());
        console.log(`El resultado de la suma es: ${calculadora.calcular(a, b)}`);
        break;
    case "-":
        calculadora = new operaciones_1.Calculadora(new operaciones_2.Resta());
        console.log(`El resultado de la resta es: ${calculadora.calcular(a, b)}`);
        break;
    case "*":
        calculadora = new operaciones_1.Calculadora(new operaciones_2.Producto());
        console.log(`El resultado del producto es: ${calculadora.calcular(a, b)}`);
        break;
    case "/":
        calculadora = new operaciones_1.Calculadora(new operaciones_2.Division());
        console.log(`El resultado de la división es: ${calculadora.calcular(a, b)}`);
        break;
    default:
        console.log("Operador inválido, usar *, /, -, + ");
        break;
}
