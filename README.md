

# 📚 Sistema Biblioteca MVP
Proyecto desarrollado para la materia Programación.
## 👥 Integrantes
- Lara Lopez
- Alexandra Molina
---
# 📌 Descripción
Sistema de gestión de biblioteca desarrollado bajo la arquitectura MVC.
Permite:
- Iniciar sesión
- Registrar usuarios
- Visualizar libros
- Buscar libros por ID
- Agregar libros
- Modificar libros
- Eliminar libros
- Registrar préstamos
- Actualizar stock automáticamente
- Gestionar distintos tipos de préstamo
---
# 🏗 Arquitectura MVC
El proyecto implementa el patrón MVC (Model - View - Controller).
## Model
Encargado de la lógica de negocio y acceso a datos.
Componentes:
- Base de datos MySQL
- Strategy
- Adapter
- Singleton
## View
Interfaz de usuario desarrollada con:
- HTML
- CSS
- Bootstrap
- JavaScript
Archivos:
- login.html
- Index.html
- prestamo.html
## Controller
Intermediario entre la vista y el modelo.
Archivo:
- BibliotecaControllers.js
---
# 🎯 Patrones de Diseño Implementados
## Singleton
Archivo:
db.js
Objetivo:
Garantizar una única conexión a la base de datos MySQL durante toda la ejecución de la aplicación.
---
## Strategy
Archivos:
- prestamoBasico.js
- prestamoPremium.js
Objetivo:
Permitir cambiar dinámicamente la lógica de préstamo según el tipo seleccionado.
### Préstamo Básico
- Duración: 7 días
### Préstamo Premium
- Duración: 30 días
---
## Adapter
Archivo:
adapterPrestamo.js
Objetivo:
Adaptar los datos del objeto Libro al formato requerido por el módulo de préstamos.
---
# 🛠 Tecnologías Utilizadas
## Backend
- Node.js
- Express
- MySQL2
- CORS
## Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
## Base de Datos
- MySQL
- XAMPP
## Testing
- Jest
---
# 🗄 Base de Datos
Nombre:
biblioteca_mvp
## Tabla Libros
| Campo | Tipo |
|---------|---------|
| id | INT |
| titulo | VARCHAR |
| autor | VARCHAR |
| stock | INT |
## Tabla Usuarios
| Campo | Tipo |
|---------|---------|
| id | INT |
| usuario | VARCHAR |
| password | VARCHAR |
## Tabla Prestamos
| Campo | Tipo |
|---------|---------|
| id | INT |
| libro_id | INT |
| usuario_id | INT |
| fecha_prestamo | DATETIME |
| fecha_devolucion | DATETIME |
| estado | VARCHAR |
| tipo | VARCHAR |
---
# 🚀 Instalación
## 1. Clonar repositorio
```bash
git clone URL_DEL_REPOSITORIO

2. Instalar dependencias

npm install

3. Configurar base de datos

Crear la base:

CREATE DATABASE biblioteca_mvp;

Importar las tablas correspondientes.

4. Ejecutar servidor

node backend.js

⸻

🌐 Acceso

Abrir en navegador:

http://localhost:3000

⸻

🧪 Testing

Para ejecutar las pruebas unitarias:

npm test

Pruebas realizadas:

* PrestamoBasico
* PrestamoPremium
* LibroAdapter
* Validación de adaptación de objetos

⸻

📂 Estructura del Proyecto

Evaluacion1_Lopez_Molina
│
├── backend.js
├── db.js
├── package.json
│
├── controller
│   └── BibliotecaControllers.js
│
├── models
│   └── estrategias
│       ├── adapterPrestamo.js
│       ├── prestamoBasico.js
│       └── prestamoPremium.js
│
├── Views
│   ├── login.html
│   ├── Index.html
│   ├── prestamo.html
│   ├── funciones.js
│   └── style.css
│
└── test
    └── biblioteca.test.js

⸻

✅ Funcionalidades Implementadas

* Login
* Registro
* CRUD de libros
* Préstamos
* Actualización automática de stock
* MVC
* Singleton
* Strategy
* Adapter
* Testing Unitario

⸻

📖 Conclusión

El proyecto cumple con los requisitos solicitados para el MVP de Biblioteca, implementando arquitectura MVC, patrones de diseño, persistencia de datos en MySQL y pruebas unitarias para la validación de la lógica de negocio.

# 📚 Fuentes / Recursos / Documentación
## Documentación Oficial
- https://nodejs.org/docs
- https://expressjs.com
- https://dev.mysql.com/doc
- https://jestjs.io/docs/getting-started
- https://getbootstrap.com/docs/5.3
## Herramientas Utilizadas
- Visual Studio Code
- Node.js
- MySQL
- XAMPP
- Git
- GitHub
## Recursos Consultados
- Documentación oficial de Express
- Documentación oficial de MySQL2
- Documentación oficial de Jest
- Bootstrap Documentation
## Frameworks y Librerías
- Express
- MySQL2
- Jest
- Bootstrap

