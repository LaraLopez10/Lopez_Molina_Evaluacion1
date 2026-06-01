const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host:     'localhost',
  user:     'root',      // usuario por defecto de XAMPP
  password: '',          // sin contraseña en XAMPP
  database: 'biblioteca_mvp'
});

conexion.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

module.exports = conexion;