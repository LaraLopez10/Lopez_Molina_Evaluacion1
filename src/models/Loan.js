export class Loan {
    constructor(book, userName) {
        this.book = book;
        this.userName = userName;
        this.loanDate = new Date();
        this.durationDays = 7; // Plazo estándar por defecto
        
        // Al crearse el préstamo, el libro pasa a estar no disponible
        this.book.isAvailable = false;
    }

    getDetails() {
        return `Libro: "${this.book.title}" | Prestado a: ${this.userName} | Plazo: ${this.durationDays} días`;
    }
}