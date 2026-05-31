# Sistema de Gestión de Biblioteca MVP 

Este proyecto es un Producto Mínimo Viable (MVP) para la gestión automatizada de préstamos en una biblioteca, desarrollado bajo una arquitectura robusta y desacoplada que conecta una interfaz web moderna con un motor de base de datos relacional.

---

## Diagrama de Arquitectura (MVC)

El sistema implementa de forma estricta el patrón arquitectónico *Modelo-Vista-Controlador (MVC)*, garantizando que la lógica de negocio, la persistencia de datos y la interfaz de usuario no se mezclen.


---

┌─────────────────────────────────────────────────────────┐
   │                       VISTA (UI)                        │
   │  • Interfaz HTML5 / CSS3 (Vibrante)                     │
   │  • Captura eventos del usuario (Clicks, Login, Select)   │
   └───────────────────────────┬─────────────────────────────┘
                               │  (Eventos / Inputs)
                               ▼
   ┌─────────────────────────────────────────────────────────┐
   │                   CONTROLADOR (JS)                      │
   │  • LibraryController.js (Orquestador de la UI)          │
   │  • Maneja estados internos (currentUser, apiUrl)        │
   │  • Consume endpoints asíncronos mediante fetch()        │
   └───────────────────────────┬─────────────────────────────┘
                               │  (Peticiones HTTP: GET / POST)
                               ▼
   ┌─────────────────────────────────────────────────────────┐
   │                   API BACKEND & MODELO                  │
   │  • server.js (Express API)                              │
   │  • Acceso Nativo a Datos (msnodesqlv8)                  │
   │  • Motor Base de Datos SQL Server (BibliotecaDB)         │
   └─────────────────────────────────────────────────────────┘


   ---


   ### Explicación de Componentes:
* **Modelo (Model):** Representado por la base de datos SQL Server (`Libros` y `Prestamos`) y los servicios intermedios de Node.js que moldean, validan y formatean la información (como transformar los bits `1/0` de SQL en booleanos legibles de JavaScript).
* **Vista (View):** El ecosistema del Frontend (HTML/CSS) encargado exclusivamente de renderizar los elementos interactivos, alertas dinámicas de estado y los badges de disponibilidad de inventario.
* **Controlador (Controller):** Encarnado en `LibraryController.js`. Es el cerebro intermediario; escucha las acciones de la vista, invoca la conversión de datos y gatilla las actualizaciones asíncronas (`updateView`) hacia la API.

---

##  Justificación de Patrones de Diseño

Para resolver problemas específicos de compatibilidad de sistemas antiguos y escalabilidad de reglas de negocio, se implementaron los siguientes patrones del catálogo GoF (*Gang of Four*):

### 1. Patrón Estructural: Adapter (Adaptador)
* **Problema específico:** El sistema requería procesar credenciales de usuarios provenientes de un sistema de texto antiguo (*Legacy*) formateado estrictamente como un String estructurado (`ID_Apellido, Nombre`), pero el sistema moderno de JavaScript necesita operar con objetos estructurados ricos.
* **Solución en código:** `UserAdapter.adaptLegacyUser(legacyString)` intercepta la cadena de texto vieja, valida sus componentes por expresiones regulares, descompone las propiedades y modela un objeto de usuario compatible con la nueva arquitectura sin modificar la infraestructura antigua.

### 2. Patrón Estructural: Decorator (Decorador)
* **Problema específico:** Las reglas de negocio de los préstamos varían dinámicamente según el tipo de cliente (Común o Premium). Agregar estas propiedades directamente alterando los objetos base generaría un código rígido y violaría el principio de Responsabilidad Única.
* **Solución en código:** Se utiliza la lógica del Decorador para extender las funcionalidades del préstamo en tiempo de ejecución. Al interceptar si el préstamo es Premium, se altera dinámicamente la duración del beneficio (extendiendo de 7 a 15 días) y se añade una funcionalidad extra (como la futura generación adjunta de comprobantes en PDF), encapsulando el comportamiento extendido de forma limpia.

---

##  Instrucciones de Ejecución

### Requisitos Previos
* **Node.js** (Versión 16 o superior)
* **SQL Server** con la base de datos `BibliotecaDB` creada y activa.
* **ODBC Driver 17 para SQL Server** instalado en el sistema operativo Windows.

### 1. Configuración de la Base de Datos
Asegúrese de poseer las siguientes tablas en su instancia local `SQLEXPRESS` con stock de libros habilitado (`disponible = 1`):
```sql
-- Reseteo rápido de stock de prueba
UPDATE Libros SET disponible = 1;
2. Levantar el Backend (API)
Abra la terminal en la carpeta raíz del proyecto backend.

Instale las dependencias necesarias:

Bash
npm install
Inicie el servidor de desarrollo nativo de Node:

Bash
node server.js
Debería ver el mensaje:  Servidor API Nativo corriendo en http://localhost:3000

3. Levantar el Frontend (Interfaz)
Utilice la extensión Live Server de VS Code sobre el archivo index.html para levantar la interfaz cliente en su entorno local de navegador web.


Pruebas Unitarias
El proyecto cuenta con una suite de tests estructurada para validar que las reglas críticas de negocio (como el procesamiento del Adaptador de texto o las extensiones del Decorador) respondan consistentemente bajo cualquier escenario.

Ejecución de los Tests
Para correr las pruebas estructuradas y verificar la salud del código, ejecute el siguiente comando en la terminal:

Bash
npm test
Si todo está correcto, la consola imprimirá el reporte detallando que las transformaciones de cadenas heredadas y la asignación diferencial de días de préstamos pasaron exitosamente todas las aserciones.