const db = require('../db');

/* =========================
   LIBROS
========================= */

exports.getLibros = (req, res) => {

    db.query(
        'SELECT * FROM libros',
        (err, resultados) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(resultados);

        }
    );

};

exports.getLibroById = (req, res) => {

    const { id } = req.params;

    db.query(
        'SELECT * FROM libros WHERE id = ?',
        [id],
        (err, resultados) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (resultados.length === 0) {

                return res.status(404).json({
                    mensaje: 'Libro no encontrado'
                });

            }

            res.json(resultados[0]);

        }
    );

};

exports.crearLibro = (req, res) => {

    const {
        titulo,
        autor,
        stock
    } = req.body;

    db.query(
        `
        INSERT INTO libros
        (titulo, autor, stock)
        VALUES (?, ?, ?)
        `,
        [titulo, autor, stock],
        (err, resultado) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            res.status(201).json({
                mensaje: 'Libro creado',
                id: resultado.insertId
            });

        }
    );

};

exports.actualizarLibro = (req, res) => {

    const { id } = req.params;

    const {
        titulo,
        autor,
        stock
    } = req.body;

    db.query(
        `
        UPDATE libros
        SET titulo = ?, autor = ?, stock = ?
        WHERE id = ?
        `,
        [titulo, autor, stock, id],
        (err) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json({
                mensaje:
                'Libro actualizado'
            });

        }
    );

};

exports.eliminarLibro = (req, res) => {

    const { id } = req.params;

    db.query(
        'DELETE FROM libros WHERE id = ?',
        [id],
        (err) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json({
                mensaje:
                'Libro eliminado'
            });

        }
    );

};

/* =========================
   LOGIN
========================= */

exports.login = (req, res) => {

    const {
        usuario,
        password
    } = req.body;

    db.query(
        `
        SELECT *
        FROM usuarios
        WHERE usuario = ?
        AND password = ?
        `,
        [usuario, password],
        (err, resultados) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            if (resultados.length === 0) {

                return res.status(401).json({
                    mensaje:
                    'Usuario o contraseña incorrectos'
                });

            }

            res.json({
                mensaje: 'Login correcto',
                id: resultados[0].id,
                usuario: resultados[0].usuario
            });

        }
    );

};

/* =========================
   REGISTER
========================= */

exports.register = (req, res) => {

    const {
        usuario,
        password
    } = req.body;

    db.query(
        `
        INSERT INTO usuarios
        (usuario,password)
        VALUES (?,?)
        `,
        [usuario, password],
        (err) => {

            if (err) {

                return res.status(500).json({
                    mensaje:
                    'El usuario ya existe'
                });

            }

            res.json({
                mensaje:
                'Usuario registrado'
            });

        }
    );

};

/* =========================
   PRESTAMOS
========================= */

exports.crearPrestamo = (req, res) => {

    const {
        libro_id,
        usuario_id,
        fecha_prestamo,
        fecha_devolucion,
        estado,
        tipo
    } = req.body;

    db.query(
        'SELECT * FROM libros WHERE id = ?',
        [libro_id],
        (err, libro) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            if (libro.length === 0) {

                return res.status(404).json({
                    mensaje:
                    'Libro no encontrado'
                });

            }

            if (libro[0].stock <= 0) {

                return res.status(400).json({
                    mensaje:
                    'No hay stock'
                });

            }

            db.query(
                `
                INSERT INTO prestamos
                (
                    libro_id,
                    usuario_id,
                    fecha_prestamo,
                    fecha_devolucion,
                    estado,
                    tipo
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    libro_id,
                    usuario_id,
                    fecha_prestamo,
                    fecha_devolucion,
                    estado,
                    tipo
                ],
                (err) => {

                    if (err) {

                        return res.status(500).json({
                            error: err.message
                        });

                    }

                    db.query(
                        `
                        UPDATE libros
                        SET stock = stock - 1
                        WHERE id = ?
                        `,
                        [libro_id],
                        (err) => {

                            if (err) {

                                return res.status(500).json({
                                    error: err.message
                                });

                            }

                            res.json({
                                mensaje:
                                'Préstamo realizado con éxito'
                            });

                        }
                    );

                }
            );

        }
    );

};