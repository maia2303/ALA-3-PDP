"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculadora = exports.Division = exports.Producto = exports.Resta = exports.Suma = void 0;
class Suma {
    ejecutar(a, b) {
        return a + b;
    }
}
exports.Suma = Suma;
class Resta {
    ejecutar(a, b) {
        return a - b;
    }
}
exports.Resta = Resta;
class Producto {
    ejecutar(a, b) {
        return a * b;
    }
}
exports.Producto = Producto;
class Division {
    ejecutar(a, b) {
        if (b === 0) {
            console.log("No se puede dividir entre cero.");
            return 0;
        }
        else {
            return a / b;
        }
    }
}
exports.Division = Division;
class Calculadora {
    constructor(operacion) {
        this.operacion = operacion;
    }
    setOperacion(operacion) {
        this.operacion = operacion;
    }
    calcular(a, b) {
        return this.operacion.ejecutar(a, b);
    }
}
exports.Calculadora = Calculadora;
