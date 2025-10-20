import { Operacion } from "./operacion";

export class Suma implements Operacion {
    ejecutar(a: number, b: number): number {
        return a + b;
    }
}
export class Resta implements Operacion {
    ejecutar(a: number, b: number): number {
        return a - b;
    }
}
export class Producto implements Operacion {
    ejecutar(a: number, b: number): number {
        return a * b;
    }
}
export class Division implements Operacion {
    ejecutar(a: number, b: number): number {
        if (b === 0) {
            console.log("No se puede dividir entre cero.");
            return 0;
        } else {
            return a / b;
        }
           
    }
}
export class Calculadora {
    private operacion: Operacion;

    constructor(operacion: Operacion) {
        this.operacion = operacion;
    }

    setOperacion(operacion: Operacion) {
        this.operacion = operacion;
    }

    calcular(a:number, b:number):  number {
        return this.operacion.ejecutar(a,b);
    }
}