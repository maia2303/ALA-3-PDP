export class Tarea{
    constructor(titulo, descripcion, dificultad, vencimiento) {
        this.titulo = titulo;
        this.descripcion = descripcion || "sin descripción";
        this.estado = "pendiente";
        this.dificultad = dificultad || 1;
        this.vencimiento = vencimiento;
        this.creacion = new Date().toLocaleString(); 
        this.ultimaEdicion = this.creacion;
    }

}

Tarea.prototype.mostrarDificultad = function () {
    const diff = Number(this.dificultad) || 1; 
    
    const estrellaRellena = "★".repeat(diff);
    const estrellaVacia = "☆".repeat(3 - diff); 
    
    return estrellaRellena + estrellaVacia;
};