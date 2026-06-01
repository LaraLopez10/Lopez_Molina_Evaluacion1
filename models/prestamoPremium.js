class PrestamoPremium {

    constructor(prestamo) {
        this.prestamo = prestamo;
    }

    descripcion() {

        return this.prestamo.descripcion() + `
        Beneficio Premium:
        - Duración 30 días
        - Reserva anticipada
        - Renovación automática
        `;

    }

}

module.exports = PrestamoPremium;

if (typeof module !== 'undefined') {
    module.exports = PrestamoPremium;
}