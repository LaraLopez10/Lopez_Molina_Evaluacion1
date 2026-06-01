class PrestamoBasico {

    constructor(libro) {
        this.libro = libro;
    }

    descripcion() {
        return `
        Libro: ${this.libro.titulo}
        Tipo: Básico
        Duración: 7 días
        `;
    }

}

module.exports = PrestamoBasico;

if (typeof module !== 'undefined') {
    module.exports = PrestamoBasico;
}