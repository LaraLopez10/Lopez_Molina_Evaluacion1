import express from 'express';
import msnodesqlv8 from 'msnodesqlv8'; // Importamos el driver nativo directo
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Cadena de conexión exacta usando el puente ODBC nativo de tu sistema
const connectionString = "Driver={ODBC Driver 17 for SQL Server};Server=ALEXANDRAMOLINA\\SQLEXPRESS;Database=BibliotecaDB;Trusted_Connection=yes;";

// 1. Obtener libros desde SQL Server
app.get('/api/books', (req, res) => {
    const query = "SELECT id, titulo, autor, disponible FROM Libros";
    
    // Ejecución directa sobre el driver de Windows
    msnodesqlv8.query(connectionString, query, (err, rows) => {
        if (err) {
            console.error("❌ ERROR DIRECTO EN SQL SERVER:", err);
            return res.status(500).send(err.message);
        }
        
        // Mapeamos para asegurar que 'disponible' llegue como booleano al front
        const booksFormatted = rows.map(libro => ({
            id: libro.id,
            titulo: libro.titulo,
            autor: libro.autor,
            disponible: libro.disponible === 1 || libro.disponible === true
        }));
        
        res.json(booksFormatted);
    });
});

// 2. Prestar un libro (Registrar préstamo y actualizar disponibilidad) - SECUENCIAL DIRECTO
app.post('/api/loans', (req, res) => {
    try {
        const { bookId, userName, durationDays, isPremium } = req.body;
        
        // Controlamos exhaustivamente qué está llegando desde el Frontend
        if (!bookId || !userName) {
            console.warn("⚠️ Advertencia: Datos incompletos recibidos:", req.body);
            return res.status(400).json({ success: false, message: 'Faltan datos del libro o del usuario.' });
        }

        const premiumBit = isPremium ? 1 : 0;
        const limpioUserName = userName.replace(/'/g, "''"); // Evita roturas por caracteres especiales

        // 1° PASO: Insertar el registro del préstamo
        const queryInsert = `INSERT INTO Prestamos (libro_id, usuario_nombre, duracion_dias, es_premium) 
                             VALUES (${parseInt(bookId)}, '${limpioUserName}', ${parseInt(durationDays)}, ${premiumBit})`;

        msnodesqlv8.query(connectionString, queryInsert, (errInsert) => {
            if (errInsert) {
                console.error("❌ ERROR AL INSERTAR PRESTAMO:", errInsert);
                return res.status(500).send(errInsert.message);
            }
            
            // 2° PASO: Si el préstamo se guardó, actualizamos la disponibilidad del libro
            const queryUpdate = `UPDATE Libros SET disponible = 0 WHERE id = ${parseInt(bookId)}`;
            
            msnodesqlv8.query(connectionString, queryUpdate, (errUpdate) => {
                if (errUpdate) {
                    console.error("❌ ERROR AL ACTUALIZAR DISPONIBILIDAD DEL LIBRO:", errUpdate);
                    return res.status(500).send(errUpdate.message);
                }
                
                // Si ambos pasos fueron exitosos, respondemos al Frontend
                console.log(`✅ Préstamo exitoso en SQL Server: Libro ID ${bookId} para ${userName}`);
                return res.status(201).json({ success: true, message: 'Préstamo guardado en SQL Server' });
            });
        });

    } catch (globalError) {
        console.error("❌ CRASH EVITADO EN EL BACKEND:", globalError);
        res.status(500).send("Error interno en el proceso del servidor.");
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor API Nativo corriendo en http://localhost:${PORT}`));