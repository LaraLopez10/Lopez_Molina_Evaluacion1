const readline = require('readline');

class ConsoleView {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Muestra el menú principal
    showMenu() {
        console.log("\n========================================");
        console.log("    SISTEMA DE BIBLIOTECA - MVP (MVC)   ");
        console.log("========================================");
        console.log("1. Registrar usuario del sistema viejo (Adapter)");
        console.log("2. Realizar Préstamo Común");
        console.log("3. Realizar Préstamo Premium (Decorator)");
        console.log("4. Ver estado de libros y préstamos");
        console.log("5. Salir");
        console.log("========================================");
    }

    // Método auxiliar para pedir datos por consola de forma limpia
    askQuestion(query) {
        return new Promise(resolve => this.rl.question(query, resolve));
    }

    showMessage(message) {
        console.log(`\n[INFO] ${message}`);
    }

    showError(message) {
        console.log(`\n[ERROR] ${message}`);
    }

    close() {
        this.rl.close();
    }
}

module.exports = ConsoleView;