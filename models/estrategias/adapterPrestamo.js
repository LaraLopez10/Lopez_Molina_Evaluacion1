class LibroAdapter {
  constructor(libro) {
    this.libro = libro;
  }

  obtenerDatosPrestamo() {
    return {
      id: this.libro.id,
      titulo: this.libro.titulo,
      autor: this.libro.autor,
    };
  }
}

module.exports = LibroAdapter;

if (typeof module !== "undefined") {
  module.exports = LibroAdapter;
}
