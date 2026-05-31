import { UserAdapter } from '../models/UserAdapter.js';

export class LibraryController {
    constructor() {
        this.currentUser = null;
        this.apiUrl = 'http://localhost:3000/api';
    }

    init() {
        document.getElementById('btnAdaptar').addEventListener('click', () => this.handleLogin());
        document.getElementById('btnLogout').addEventListener('click', () => this.handleLogout());
        document.getElementById('btnLoanComun').addEventListener('click', () => this.handleLoan(false));
        document.getElementById('btnLoanPremium').addEventListener('click', () => this.handleLoan(true));

        // Quitamos this.updateView() de acá para evitar peticiones prematuras en el Login
    }

    handleLogin() {
        const legacyString = document.getElementById('legacyString').value;
        try {
            this.currentUser = UserAdapter.adaptLegacyUser(legacyString);
            this.showNotification(`Acceso concedido. ¡Bienvenido ${this.currentUser.fullName}!`, 'success');
            
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('mainDashboard').classList.remove('hidden');
            document.getElementById('activeUser').innerText = `${this.currentUser.fullName}`;
            document.getElementById('legacyString').value = '';
            
            // Los datos se cargan acá, justo cuando el dashboard pasa a estar visible
            this.updateView();
        } catch (error) {
            this.showNotification(error.message, 'danger');
        }
    }

    handleLogout() {
        this.currentUser = null;
        document.getElementById('mainDashboard').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
    }

    async handleLoan(isPremium) {
        if (!this.currentUser) return;

        const bookSelect = document.getElementById('bookSelect');
        const bookId = parseInt(bookSelect.value);

        if (!bookId) {
            this.showNotification("Por favor, selecciona un libro disponible.", 'danger');
            return;
        }

        const durationDays = isPremium ? 15 : 7;

        try {
            const response = await fetch(`${this.apiUrl}/loans`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookId: bookId,
                    userName: this.currentUser.fullName,
                    durationDays: durationDays,
                    isPremium: isPremium
                })
            });

            if (response.ok) {
                this.showNotification(`Préstamo procesado en SQL Server con éxito.`, 'success');
                this.updateView();
            } else {
                this.showNotification("El servidor rechazó la solicitud de préstamo.", 'danger');
            }
        } catch (error) {
            this.showNotification("Error al conectar con el servidor de Base de Datos.", 'danger');
        }
    }

    async updateView() {
        try {
            const response = await fetch(`${this.apiUrl}/books`);
            
            // Si la API tira un error 500 o 404, lanzamos una excepción para que caiga en el catch
            if (!response.ok) {
                throw new Error(`Error de servidor: Status ${response.status}`);
            }

            const books = await response.json();

            // 1. Llenar el select de libros disponibles
            const bookSelect = document.getElementById('bookSelect');
            bookSelect.innerHTML = '<option value="">-- Seleccionar un libro --</option>';
            books.filter(b => b.disponible).forEach(b => {
                bookSelect.innerHTML += `<option value="${b.id}">${b.titulo} (${b.autor})</option>`;
            });

            // 2. Llenar el monitor de inventario
            const booksList = document.getElementById('booksList');
            booksList.innerHTML = '';
            books.forEach(b => {
                const badgeClass = b.disponible ? 'available' : 'borrowed';
                const badgeText = b.disponible ? 'DISPONIBLE' : 'PRESTADO';
                booksList.innerHTML += `<li>"${b.titulo}" por <em>${b.autor}</em> 
                    <span class="status-badge ${badgeClass}">${badgeText}</span></li>`;
            });

        } catch (error) {
            console.error("Error al renderizar el dashboard con SQL Server", error);
            this.showNotification("No se pudieron cargar los libros desde SQL Server.", 'danger');
        }
    }

    showNotification(message, type) {
        const area = document.getElementById('notificationArea');
        area.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
        setTimeout(() => { area.innerHTML = ''; }, 4000);
    }
}