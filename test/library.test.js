import { describe, test } from 'node:test';
import assert from 'node:assert';

// 🚀 RUTAS CORREGIDAS AL 100% SEGÚN TU ÁRBOL DE CARPETAS
import { Book } from '../src/models/Books.js';
import { Loan } from '../src/models/Loan.js';
import { UserAdapter } from '../src/models/UserAdapter.js';
import { PremiumDecorator } from '../src/models/PremiumDecorator.js';

describe('Pruebas Unitarias del Modelo - Sistema de Biblioteca', () => {

    // Test 1: Lógica de negocio del Préstamo Común
    test('Debería crear un préstamo común con un plazo de 7 días', () => {
        const libro = new Book(1, "Clean Code", "Robert C. Martin");
        const prestamo = new Loan(libro, "Alexandra Molina");

        assert.strictEqual(prestamo.durationDays, 7);
        assert.strictEqual(libro.isAvailable, false); // El libro debe cambiar su estado
    });

    // Test 2: Lógica de negocio del Patrón Adapter
    test('Debería adaptar correctamente un string del sistema viejo al formato actual', () => {
        const stringViejo = "33_Molina, Alexandra";
        const usuarioAdaptado = UserAdapter.adaptLegacyUser(stringViejo);

        assert.strictEqual(usuarioAdaptado.id, 33);
        assert.strictEqual(usuarioAdaptado.firstName, "Alexandra");
        assert.strictEqual(usuarioAdaptado.lastName, "Molina");
        assert.strictEqual(usuarioAdaptado.fullName, "Alexandra Molina");
    });

    // Test 3: Validación de errores en el Adapter
    test('Debería lanzar un error si el formato del usuario antiguo es incorrecto', () => {
        const stringInvalido = "Alexandra";
        
        assert.throws(() => {
            UserAdapter.adaptLegacyUser(stringInvalido);
        }, new Error("Formato de usuario antiguo no válido."));
    });

    // Test 4: Lógica de negocio del Patrón Decorator (Premium)
    test('Debería extender el plazo a 15 días y modificar los detalles al usar PremiumDecorator', () => {
        const libro = new Book(2, "Patrones de Diseño", "GoF");
        const prestamoBase = new Loan(libro, "Alexandra Molina");
        
        // Aplicamos el decorador
        const prestamoPremium = new PremiumDecorator(prestamoBase);

        assert.strictEqual(prestamoBase.durationDays, 15); // El decorador alteró dinámicamente los días
        assert.match(prestamoPremium.getDetails(), /MODO PREMIUM/); // Verifica que el texto incluya el beneficio
    });
});