const PrestamoBasico =
require('../models/estrategias/prestamoBasico');

const PrestamoPremium =
require('../models/estrategias/prestamoPremium');

const LibroAdapter =
require('../models/estrategias/adapterPrestamo');


describe(
    'Tests Biblioteca MVP',
    () => {

        test(
            'PrestamoBasico devuelve descripcion correcta',
            () => {

                const libro = {
                    titulo: 'Harry Potter'
                };

                const prestamo =
                    new PrestamoBasico(libro);

                expect(
                    prestamo.descripcion()
                ).toContain(
                    'Duración: 7 días'
                );

            }
        );

        test(
            'PrestamoPremium agrega beneficios',
            () => {

                const libro = {
                    titulo: 'Harry Potter'
                };

                const basico =
                    new PrestamoBasico(libro);

                const premium =
                    new PrestamoPremium(basico);

                expect(
                    premium.descripcion()
                ).toContain(
                    'Duración 30 días'
                );

            }
        );

        test(
            'LibroAdapter adapta correctamente un libro',
            () => {

                const libro = {

                    id: 1,

                    titulo:
                    'El Principito',

                    autor:
                    'Saint Exupery'

                };

                const adapter =
                    new LibroAdapter(libro);

                const resultado =
                    adapter.obtenerDatosPrestamo();

                expect(
                    resultado.id
                ).toBe(1);

                expect(
                    resultado.titulo
                ).toBe(
                    'El Principito'
                );

                expect(
                    resultado.autor
                ).toBe(
                    'Saint Exupery'
                );

            }
        );

        test(
    'PrestamoBasico contiene el titulo del libro',
    () => {

        const libro = {
            titulo: 'Harry Potter'
        };

        const prestamo =
            new PrestamoBasico(libro);

        expect(
            prestamo.descripcion()
        ).toContain(
            'Harry Potter'
        );

    }
);

test(
    'PrestamoPremium conserva el titulo del libro',
    () => {

        const libro = {
            titulo: 'Harry Potter'
        };

        const basico =
            new PrestamoBasico(libro);

        const premium =
            new PrestamoPremium(basico);

        expect(
            premium.descripcion()
        ).toContain(
            'Harry Potter'
        );

    }
);

test(
    'LibroAdapter devuelve id numerico',
    () => {

        const libro = {

            id: 10,

            titulo: 'Clean Code',

            autor: 'Robert Martin'

        };

        const adapter =
            new LibroAdapter(libro);

        expect(
            typeof adapter.obtenerDatosPrestamo().id
        ).toBe(
            'number'
        );

    }
);

test(
    'LibroAdapter devuelve estructura completa',
    () => {

        const libro = {

            id: 1,

            titulo: 'El Principito',

            autor: 'Saint Exupery'

        };

        const adapter =
            new LibroAdapter(libro);

        const resultado =
            adapter.obtenerDatosPrestamo();

        expect(resultado).toHaveProperty('id');

        expect(resultado).toHaveProperty('titulo');

        expect(resultado).toHaveProperty('autor');

    }
);

        test(
            'LibroAdapter devuelve objeto definido',
            () => {

                const libro = {

                    id: 2,

                    titulo:
                    'Clean Code',

                    autor:
                    'Robert Martin'

                };

                const adapter =
                    new LibroAdapter(libro);

                expect(
                    adapter.obtenerDatosPrestamo()
                ).toBeDefined();

            }
        );

    }
    
);