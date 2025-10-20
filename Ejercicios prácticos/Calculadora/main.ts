import PromptSync from "prompt-sync";
import { Calculadora } from "./src/operaciones";
import { Suma, Resta, Division, Producto } from "./src/operaciones";

const prompt = PromptSync();

console.log(" ~ Calculadora ~");
const a = Number(prompt("Ingrese el primer número: "));
const b = Number(prompt("Ingrese el segundo número: "));

const operacion = prompt("Ingrese el operador ( *, /, -, +):  ")
let calculadora: Calculadora;

switch(operacion) {
    case "+" :
        calculadora = new Calculadora(new Suma());
        console.log(`El resultado de la suma es: ${calculadora.calcular(a,b)}`);
        break;
    case "-":
        calculadora = new Calculadora(new Resta());
        console.log(`El resultado de la resta es: ${calculadora.calcular(a,b)}`);
        break;
    case "*":
        calculadora = new Calculadora(new Producto());
        console.log(`El resultado del producto es: ${calculadora.calcular(a,b)}`);
        break;
    case "/":
        calculadora = new Calculadora(new Division());
        console.log(`El resultado de la división es: ${calculadora.calcular(a,b)}`);
    break;
    default:
        console.log("Operador inválido, usar *, /, -, + ");
        break;

}