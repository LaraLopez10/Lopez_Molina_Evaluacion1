const express = require('express');
const cors = require('cors');
const path = require('path');

const controller = require('./controller/BibliotecaControllers.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'Views')));

/* =========================
   LIBROS
========================= */

app.get('/libros', controller.getLibros);
app.get('/libros/:id', controller.getLibroById);
app.post('/libros', controller.crearLibro);
app.put('/libros/:id', controller.actualizarLibro);
app.delete('/libros/:id', controller.eliminarLibro);

/* =========================
   LOGIN
========================= */

app.post('/login', controller.login);


/* =========================
   PRESTAMOS
========================= */

app.post('/prestamos', controller.crearPrestamo);

app.get('/prestamos', controller.getPrestamos);

/* DEVOLVER PRESTAMO */
app.put('/prestamos/devolver/:libroId', controller.devolverPrestamo);

/* =========================
   VISTAS
========================= */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'login.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'Index.html'));
});

app.get('/prestamo', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'prestamo.html'));
});

app.get('/devolucion', (req, res) => {
    res.sendFile(path.join(__dirname, 'Views', 'devolucion.html'));
});
/* =========================
   SERVIDOR
========================= */

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});