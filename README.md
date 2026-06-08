

---

````md
# 📚 Sistema Biblioteca MVP

---

## 👥 Integrantes

- Lara López  
- Alexandra Molina  

---

## 📌 Descripción

Sistema de gestión de biblioteca desarrollado con arquitectura **MVC** utilizando **Node.js, Express y MySQL**.

Permite administrar libros, usuarios y préstamos, incluyendo control automático de stock, registro de devoluciones y cálculo de fechas de devolución según el tipo de préstamo.

---

## ⚙️ Funcionalidades

### 📖 Gestión de Libros

- Visualizar libros disponibles  
- Buscar libros por ID  
- Agregar libros  
- Modificar libros  
- Eliminar libros  
- Control automático de stock  

---

### 👤 Gestión de Usuarios

- Registro de usuarios  
- Inicio de sesión  

---

### 📦 Gestión de Préstamos

- Registrar préstamos de libros  
- Registrar persona que recibe el préstamo  
- Seleccionar tipo de préstamo  
- Cálculo automático de fecha de devolución  
- Descuento automático de stock  
- Visualización de préstamos activos  
- Registro de devoluciones  
- Incremento automático de stock al devolver  

---

## 🧱 Arquitectura MVC

### 📦 Model

Responsable de la lógica de negocio y acceso a datos.

Incluye:

- MySQL  
- Singleton  
- Strategy  
- Adapter  

---

### 🖥️ View

Interfaz desarrollada con:

- HTML5  
- CSS3  
- Bootstrap 5  
- JavaScript  

**Archivos:**

- login.html  
- index.html  
- prestamo.html  
- devolucion.html  

---

### 🎮 Controller

Conecta la vista con el modelo.

**Archivo principal:**

- BibliotecaControllers.js  

---

## 🧠 Patrones de Diseño

### 🔗 Singleton

**Archivo:** `db.js`

Mantiene una única conexión activa a MySQL durante toda la ejecución del sistema.

---

### 🎯 Strategy

**Archivos:**

- prestamoBasico.js  
- prestamoPremium.js  

Permite cambiar el comportamiento del préstamo según el tipo seleccionado.

- Básico: 7 días  
- Premium: 30 días  

---

### 🔄 Adapter

**Archivo:** `adapterPrestamo.js`

Adapta la estructura de libros al formato requerido por el sistema de préstamos.

---

## 🛠️ Tecnologías Utilizadas

### Backend

- Node.js  
- Express  
- MySQL2  
- CORS  

### Frontend

- HTML5  
- CSS3  
- Bootstrap 5  
- JavaScript  

### Base de Datos

- MySQL  
- XAMPP  

### Testing

- Jest  

---

## 🗄️ Base de Datos

**Nombre:** `biblioteca_mvp`

---

### 📘 Tabla: libros

| Campo  | Tipo    |
|--------|--------|
| id     | INT     |
| titulo | VARCHAR |
| autor  | VARCHAR |
| stock  | INT     |

---

### 👤 Tabla: usuarios

| Campo    | Tipo    |
|----------|--------|
| id       | INT     |
| usuario  | VARCHAR |
| password | VARCHAR |

---

### 📦 Tabla: prestamos

| Campo            | Tipo     |
|------------------|---------|
| id               | INT      |
| libro_id         | INT      |
| nombre_persona   | VARCHAR  |
| fecha_prestamo   | DATETIME |
| fecha_devolucion | DATETIME |
| estado           | VARCHAR  |
| tipo             | VARCHAR  |

---

## 🔄 Flujo de Préstamos

1. Selección de libro  
2. Ingreso de persona solicitante  
3. Selección de tipo de préstamo  
4. Cálculo automático de fecha de devolución  
5. Registro del préstamo  
6. Descuento de stock  
7. Visualización en préstamos activos  
8. Al devolver:
   - Cambio de estado a “devuelto”  
   - Incremento de stock  
   - Eliminación de la lista activa  

---

## 🚀 Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
````

---

### 2. Instalar dependencias

```bash
npm install
npm install express
npm install cors
npm install mysql2
npm install jest
```

---

### 3. Crear base de datos

```sql
CREATE DATABASE biblioteca_mvp;
```

Luego crear las tablas correspondientes.

---

### 4. Ejecutar servidor

```bash
node backend.js
```

---

## 🌐 Acceso al sistema

```
http://localhost:3000
```

---

## 🧪 Testing

Ejecutar pruebas unitarias:

```bash
npm test
```

### ✔️ Pruebas realizadas

* PrestamoBasico
* PrestamoPremium
* AdapterPrestamo
* Validación de lógica de préstamos

---

## 📁 Estructura del Proyecto

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
│   ├── index.html
│   ├── prestamo.html
│   ├── devolucion.html
│   ├── funciones.js
│   └── style.css
│
└── test
    └── biblioteca.test.js
```

---

## 🎯 Conclusión

El sistema **Biblioteca MVP** cumple con los requisitos de un sistema de gestión completo, aplicando arquitectura **MVC**, patrones de diseño (**Singleton, Strategy y Adapter**), persistencia en **MySQL** y testing con **Jest**, garantizando un proyecto escalable, organizado y mantenible.

```
