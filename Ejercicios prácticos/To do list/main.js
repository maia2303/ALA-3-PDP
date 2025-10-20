import { Tarea } from "./tarea.js";
import { gestionTarea } from "./gestionTarea.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync();
const gestor = new gestionTarea();

let opcion = -1;
while (opcion !== 0) {
    console.log("\n --- Menú de tareas ---");
    console.log("[1] Ver mis tareas.");
    console.log("[2] Buscar una tarea.");
    console.log("[3] Agregar una tarea.");
    console.log("[0] Salir.");

    opcion = Number(prompt(">> "));

    switch(opcion) {
        case 1:
            gestor.verTareas();
            break;
        case 2:
            gestor.buscarTarea();
            break;
        case 3:
            gestor.agregarTarea();
            break;
        case 0:
            console.log("👋 Saliendo del programa...");
            break;
        default:
            console.log("⚠️ Opción inválida");
    }
}