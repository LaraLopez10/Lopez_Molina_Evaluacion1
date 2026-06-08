# Sistema Biblioteca MVP

## Integrantes

* Lara López
* Alexandra Molina

---

# Descripción

Sistema de gestión de biblioteca desarrollado con arquitectura MVC utilizando Node.js, Express y MySQL.

El sistema permite administrar libros y préstamos de manera sencilla, registrando quién solicita cada libro, las fechas de préstamo y devolución, y controlando automáticamente el stock disponible.

---

# Funcionalidades

## Gestión de Libros

* Visualizar todos los libros disponibles.
* Buscar libros por ID.
* Agregar nuevos libros.
* Modificar información de libros.
* Eliminar libros.
* Control automático de stock.

## Gestión de Usuarios

* Registro de usuarios administradores.
* Inicio de sesión.

## Gestión de Préstamos

* Registrar préstamos de libros.
* Registrar el nombre de la persona que recibe el préstamo.
* Seleccionar tipo de préstamo.
* Calcular automáticamente la fecha límite de devolución.
* Descontar automáticamente una unidad del stock al realizar un préstamo.
* Visualizar préstamos activos.
* Registrar devoluciones.
* Incrementar automáticamente el stock al devolver un libro.

---

# Arquitectura MVC

El proyecto implementa el patrón MVC (Model - View - Controller).

## Model

Responsable de la lógica de negocio, acceso a datos y patrones de diseño.

Componentes:

* Base de datos MySQL.
* Singleton.
* Strategy.
* Adapter.

## View

Interfaz desarrollada con:

* HTML5
* CSS3
* Bootstrap 5
* JavaScript

Archivos principales:

* login.html
* Index.html
* prestamo.html
* devolucion.html

## Controller

Responsable de conectar la vista con el modelo.

Archivo principal:

* BibliotecaControllers.js

---

# Patrones de Diseño Implementados

## Singleton

### Archivo

db.js

### Objetivo

Mantener una única conexión activa con la base de datos MySQL durante toda la ejecución del sistema.

---

## Strategy

### Archivos

* prestamoBasico.js
* prestamoPremium.js

### Objetivo

Permitir modificar el comportamiento del préstamo según el tipo seleccionado.

### Préstamo Básico

* Duración de 7 días.

### Préstamo Premium

* Duración de 30 días.

---

## Adapter

### Archivo

adapterPrestamo.js

### Objetivo

Adaptar la información de los libros al formato requerido por el módulo de préstamos.

---

# Tecnologías Utilizadas

## Backend

* Node.js
* Express
* MySQL2
* CORS

## Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript

## Base de Datos

* MySQL
* XAMPP

## Testing

* Jest

---

# Base de Datos

Nombre de la base de datos:

biblioteca_mvp

## Tabla libros

| Campo  | Tipo    |
| ------ | ------- |
| id     | INT     |
| titulo | VARCHAR |
| autor  | VARCHAR |
| stock  | INT     |

## Tabla usuarios

| Campo    | Tipo    |
| -------- | ------- |
| id       | INT     |
| usuario  | VARCHAR |
| password | VARCHAR |

## Tabla prestamos

| Campo            | Tipo     |
| ---------------- | -------- |
| id               | INT      |
| libro_id         | INT      |
| nombre_persona   | VARCHAR  |
| fecha_prestamo   | DATETIME |
| fecha_devolucion | DATETIME |
| estado           | VARCHAR  |
| tipo             | VARCHAR  |

---

# Flujo de Préstamos

1. El administrador selecciona un libro.
2. Ingresa el nombre de la persona que solicita el préstamo.
3. Selecciona el tipo de préstamo.
4. El sistema calcula automáticamente la fecha de devolución.
5. Se registra el préstamo.
6. El stock del libro disminuye en una unidad.
7. El préstamo aparece en la pantalla de préstamos activos.
8. Al devolver el libro:

   * Se actualiza el estado a "devuelto".
   * El stock aumenta en una unidad.
   * El préstamo deja de aparecer en la lista de préstamos activos.

---

# Instalación

## 1. Clonar repositorio

```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

## 2. Instalar dependencias

```bash
npm install
```

Dependencias utilizadas:

```bash
npm install express
npm install cors
npm install mysql2
npm install jest
```

## 3. Configurar la base de datos

Crear la base:

```sql
CREATE DATABASE biblioteca_mvp;
```

Crear las tablas correspondientes e importar los datos iniciales.

## 4. Ejecutar el servidor

```bash
node backend.js
```

---

# Acceso al Sistema

Abrir en el navegador:

```text
http://localhost:3000
```

---

# Testing

Para ejecutar las pruebas:

```bash
npm test
```

Pruebas realizadas:

* PrestamoBasico
* PrestamoPremium
* AdapterPrestamo
* Validación de lógica de préstamos

---

# Estructura del Proyecto

```txt
BibliotecaMVP
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
│   ├── devolucion.html
│   ├── funciones.js
│   └── style.css
│
└── test
    └── biblioteca.test.js
```

---

# Funcionalidades Implementadas

* Login de usuarios.
* Registro de usuarios.
* CRUD completo de libros.
* Búsqueda por ID.
* Gestión de préstamos.
* Gestión de devoluciones.
* Registro de persona que recibe el préstamo.
* Cálculo automático de fecha de devolución.
* Actualización automática de stock.
* Visualización de préstamos activos.
* Arquitectura MVC.
* Patrón Singleton.
* Patrón Strategy.
* Patrón Adapter.
* Testing unitario.

---

# Conclusión

El sistema Biblioteca MVP cumple con los requisitos propuestos para la gestión básica de una biblioteca. Implementa arquitectura MVC, patrones de diseño (Singleton, Strategy y Adapter), persistencia de datos mediante MySQL y pruebas unitarias para validar el correcto funcionamiento de la lógica de negocio.
