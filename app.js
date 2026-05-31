import { LibraryController } from './src/controllers/LibraryController.js';

// Esperamos a que el HTML termine de cargar en el navegador
document.addEventListener('DOMContentLoaded', () => {
    const controller = new LibraryController();
    controller.init();
    console.log(" MVP de Biblioteca Web inicializado correctamente.");
});