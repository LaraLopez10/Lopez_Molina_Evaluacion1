//BIBLIOTECACONTROLLER.JS

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
   PRESTAMOS
========================= */

exports.crearPrestamo = (req, res) => {

    const {
    libro_id,
    nombre_persona,
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
                nombre_persona,
                fecha_prestamo,
                fecha_devolucion,
                estado,
                tipo
            )
            VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
    libro_id,
    nombre_persona,
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

exports.getPrestamos = (req,res)=>{

    db.query(
        `
        SELECT
            p.id,
            p.libro_id,
            p.nombre_persona,
            p.fecha_prestamo,
            p.fecha_devolucion,
            p.estado,
            p.tipo,
            l.titulo,
            l.autor
        FROM prestamos p
        INNER JOIN libros l
            ON p.libro_id = l.id
        WHERE p.estado='prestado'
        `,
        (err,resultados)=>{

            if(err){

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json(resultados);

        }
    );

};

exports.devolverPrestamo = (req, res) => {

    const { libroId } = req.params;

    db.query(
        `
        SELECT *
        FROM prestamos
        WHERE libro_id = ?
        AND estado = 'prestado'
        ORDER BY id DESC
        LIMIT 1
        `,
        [libroId],
        (err, resultado) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (resultado.length === 0) {
                return res.status(404).json({
                    mensaje: 'No hay préstamos activos'
                });
            }

            const prestamoId = resultado[0].id;

            db.query(
                `
                UPDATE prestamos
                SET estado = 'devuelto'
                WHERE id = ?
                `,
                [prestamoId],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            error: err.message
                        });
                    }

                    db.query(
                        `
                        UPDATE libros
                        SET stock = stock + 1
                        WHERE id = ?
                        `,
                        [libroId],
                        (err) => {

                            if (err) {
                                return res.status(500).json({
                                    error: err.message
                                });
                            }

                            res.json({
                                mensaje:
                                'Libro devuelto correctamente'
                            });

                        }
                    );

                }
            );

        }
    );

};