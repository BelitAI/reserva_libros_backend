// Usuarios
const usuarios = [
    {
        nombre: 'Juan',
        apellidos: 'García López',
        mail: 'juan@gmail.com',
        contrasena: '123456',
        es_admin: false
    },
    {
        nombre: 'María',
        apellidos: 'Fernández Pérez',
        mail: 'maria@gmail.com',
        contrasena: '123456',
        es_admin: true
    },
    {
        nombre: 'Pedro',
        apellidos: 'Martínez Ruiz',
        mail: 'pedro@gmail.com',
        contrasena: '123456',
        es_admin: false
    },
    {
        nombre: 'Laura',
        apellidos: 'Sánchez Gómez',
        mail: 'laura@gmail.com',
        contrasena: '123456',
        es_admin: false
    }
];


// Autores
const autores = [
    {
        nombre: 'Miguel de Cervantes',
        nacionalidad: 'Española',
        fecha_nacimiento: '1547-09-29'
    },
    {
        nombre: 'Gabriel García Márquez',
        nacionalidad: 'Colombiana',
        fecha_nacimiento: '1927-03-06'
    },
    {
        nombre: 'George Orwell',
        nacionalidad: 'Británica',
        fecha_nacimiento: '1903-06-25'
    },
    {
        nombre: 'J. K. Rowling',
        nacionalidad: 'Británica',
        fecha_nacimiento: '1965-07-31'
    }
];


// Libros
const libros = [
    {
        titulo: 'Don Quijote de la Mancha',
        autor_id: 1,
        genero: 'Novela',
        estado: 'disponible'
    },
    {
        titulo: 'Cien años de soledad',
        autor_id: 2,
        genero: 'Realismo mágico',
        estado: 'disponible'
    },
    {
        titulo: '1984',
        autor_id: 3,
        genero: 'Ciencia ficción',
        estado: 'disponible'
    },
    {
        titulo: 'Harry Potter y la piedra filosofal',
        autor_id: 4,
        genero: 'Fantasía',
        estado: 'disponible'
    }
];


// Préstamos
const prestamos = [
    {
        usuario_id: 1,
        libro_id: 1,
        fecha_prestamo: '2026-10-01',
        fecha_devolucion: '2026-10-15'
    },
    {
        usuario_id: 2,
        libro_id: 2,
        fecha_prestamo: '2026-10-05',
        fecha_devolucion: null
    },
    {
        usuario_id: 3,
        libro_id: 3,
        fecha_prestamo: '2026-10-10',
        fecha_devolucion: null
    }
];