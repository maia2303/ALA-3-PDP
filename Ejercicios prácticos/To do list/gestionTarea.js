import { Tarea } from "./tarea.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

export function gestionTarea() {
    this.tareas = []; 
    this.contadorTarea = 0;
}

gestionTarea.prototype.agregarTarea = function() {
    let titulo = "";
    while(titulo.trim() === "") {
        titulo = prompt("Ingrese un título: ");
    }
    let descripcion = prompt("Ingrese una descripción: ");
    let dificultad = Number(prompt("[1] Fácil  [2] Medio  [3] Difícil: "));
    if (dificultad !== 1 && dificultad !== 2 && dificultad !== 3) {
        dificultad = 1;
        console.log("\n⚠️  Dificultad inválida. Se asigna fácil. \n");
    }
    let vencimiento = prompt("Fecha de vencimiento (dd/mm/aaaa): ");

    const nuevaTarea = new Tarea(titulo, descripcion, dificultad, vencimiento);

    this.tareas[this.contadorTarea] = nuevaTarea;
    this.contadorTarea++;
    console.log("Tarea creada con éxito. ✅")
}

gestionTarea.prototype.mostrarDetalles = function (t) {
    console.log("\n --- Detalles de la tarea ---");
    console.log("Título: ", t.titulo || "sin datos");
    console.log("Descripción: ", t.descripcion || "sin datos");
    console.log("Estado: ", t.estado);
    console.log("Dificultad: ", t.mostrarDificultad());
    console.log("Vencimiento: ", t.vencimiento || "sin datos");
    console.log("Creación: ", t.creacion);
    console.log("Última edición: ", t.ultimaEdicion || "sin datos");
    console.log("-------------------------");
};

gestionTarea.prototype.editarTarea = function(tarea) {
    console.log("\n --- Editar ---");
    console.log("Presiona Enter para mantener la información o escribe [borrar] para borrar el campo \n");


    let nuevoTitulo = prompt(`Título: [${tarea.titulo}]: `);
    if (nuevoTitulo.trim().toLowerCase() === "borrar") { 
        tarea.titulo = ""; 
    } else if (nuevoTitulo.trim() !== "") {
        tarea.titulo = nuevoTitulo; 
    }

    let nuevaDescripcion = prompt(`Descripción: [${tarea.descripcion}]: `);
    if (nuevaDescripcion.trim().toLowerCase() === "borrar") { 
        tarea.descripcion = ""; 
    } else if (nuevaDescripcion.trim() !== "") {
        tarea.descripcion = nuevaDescripcion;
    }

    let estadoInput = prompt(`[1] Pendiente  [2] En curso  [3] Terminada  [4] Cancelada (actual: ${tarea.estado}): `);
    if (estadoInput === "1") tarea.estado = "pendiente";
    else if (estadoInput === "2") tarea.estado = "en curso";
    else if (estadoInput === "3") tarea.estado = "terminada";
    else if (estadoInput === "4") tarea.estado = "cancelada";

    let dificultadValida = (tarea.dificultad >= 1 && tarea.dificultad <= 3) ? tarea.dificultad : 1;
    let dificultadInput = prompt(`[1] Fácil  [2] Medio  [3] Difícil  (actual: ${dificultadValida}): `);
    if (dificultadInput === "1" || dificultadInput === "2" || dificultadInput === "3") {
        tarea.dificultad = Number(dificultadInput);
    }

    let nuevoVencimiento = prompt(`Fecha de vencimiento [${tarea.vencimiento || "Sin datos"}]: `);
    if (nuevoVencimiento.trim().toLowerCase() === "borrar") { 
        tarea.vencimiento = ""; 
    } else if (nuevoVencimiento.trim() !== "") {
        tarea.vencimiento = nuevoVencimiento;
    }

    tarea.ultimaEdicion = new Date().toLocaleString();

    console.log("Tarea actualizada con éxito. ✅")
};

gestionTarea.prototype.verTareas = function () {
    let opcionVer = -1;

    while (opcionVer !== 0) {
        console.log("\n ¿Qué tareas deseas ver?");
        console.log("[1] Todas");
        console.log("[2] Pendientes");
        console.log("[3] En curso");
        console.log("[4] Terminadas");
        console.log("[5] Canceladas");
        console.log("[0] Volver");
        opcionVer = Number(prompt(">> "));

        let filtro = "";
        switch(opcionVer) {
            case 1:
                filtro = "todas";
                break;
            case 2:
                filtro = "pendiente";
                break;
            case 3:
                filtro = "en curso";
                break;
            case 4:
                filtro = "terminada";
                break;
            case 5:
                filtro = "cancelada";
                break;
            case 0:
                console.log("⬅️ Volviendo al menú principal...");
                continue;
            default:
                console.log("⚠️ Opción inválida.");
                continue;
        }

        let tareasFiltradas = [];
        let cantidadFiltradas = 0;

        for(let i = 0; i < this.contadorTarea; i++) {
            let t = this.tareas [i];
            if(filtro === "todas" || t.estado === filtro) {
                tareasFiltradas[cantidadFiltradas] = t;
                cantidadFiltradas++
            }
        }
        if(cantidadFiltradas === 0) {
            console.log("❌ No hay tareas para mostrar en esta categoría.");
            continue;
        }
        
        
        console.log(`\nEstas son tus tareas ${filtro === 'todas' ? '' : `(${filtro})`}:\n`);
        for(let index = 0; index < cantidadFiltradas; index++) {
            let t = tareasFiltradas[index];
            console.log(`[${index + 1}] ${t.titulo}`);
        }

        let verDetalle = Number(prompt("¿Deseas ver los detalles de alguna tarea? Introduce el número de tarea o 0 para volver. > "));
        if(verDetalle === 0) continue;
        if (verDetalle > 0 && verDetalle <= cantidadFiltradas){
            const t = tareasFiltradas[verDetalle - 1];
            this.mostrarDetalles(t);

            let acción = prompt("Presiona Enter para volver o E para editar: ");
            if(acción.toLowerCase() === "e") {
                this.editarTarea(t);
            }
        }else {
            console.log("⚠️ Número inválido. Intenta de nuevo.");
        }
    }
};

gestionTarea.prototype.buscarTarea = function() {
    let palabraClave = prompt("🔍 Ingresa una palabra clave para buscar en tus tareas: ").toLowerCase();

    let tareasEncontradas = [];
    let cantidadEncontradas = 0;

    for(let i = 0; i < this.contadorTarea; i++) {
        let tareaActual = this.tareas[i];
        if (tareaActual.titulo.toLowerCase().includes(palabraClave) || tareaActual.descripcion.toLowerCase().includes(palabraClave)) {
            tareasEncontradas[cantidadEncontradas] = tareaActual;
            cantidadEncontradas++;
        }
    }
    if(cantidadEncontradas === 0) {
        console.log("❌ No se encontraron tareas relacionadas. ");
        return;
    }

    console.log(`\n Se encontraron ${cantidadEncontradas} tarea(s): \n`);
    for (let i = 0; i < cantidadEncontradas; i++) {
        console.log(`[${i + 1}] ${tareasEncontradas[i].titulo}`);
    }
    let t = null; 
    
    let verDetalle = Number(prompt("¿Deseas ver los detalles de alguna tarea encontrada? Introduce el número correspondiente o 0 para volver.  > "));
    if (verDetalle === 0) {
        return;
    } else if (verDetalle > 0 && verDetalle <= cantidadEncontradas) {
        t = tareasEncontradas[verDetalle - 1]; 
        this.mostrarDetalles(t);
    } else {
        console.log("⚠️ Número inválido. Intenta de nuevo."); 
        return;
    }
    let acción = prompt("Presiona Enter para volver o E para editar: ");
   
    if (acción.toLowerCase() === "e") {
        this.editarTarea(t);
    } 
};