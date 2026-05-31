export class PremiumDecorator {
    constructor(loan) {
        this.loan = loan;
        // Modificamos dinámicamente la propiedad del objeto envuelto
        this.loan.durationDays = 15; 
    }

    getDetails() {
        // Añadimos comportamiento extra al método original
        return ${this.loan.getDetails()} [MODO PREMIUM: Incluye acceso a versión PDF digital];
    }
}