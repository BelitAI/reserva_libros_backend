import Usuario from "./user.model.js";
let usuarios = [
  { id: 1, nombre: 'Juan',  apellidos: 'García López',    mail: 'juan@gmail.com',  contrasena: '123456', es_admin: false },
  { id: 2, nombre: 'María', apellidos: 'Fernández Pérez', mail: 'maria@gmail.com', contrasena: '123456', es_admin: true  },
  { id: 3, nombre: 'Pedro', apellidos: 'Martínez Ruiz',   mail: 'pedro@gmail.com', contrasena: '123456', es_admin: false },
  { id: 4, nombre: 'Laura', apellidos: 'Sánchez Gómez',   mail: 'laura@gmail.com', contrasena: '123456', es_admin: false },
];

const autores = [
  { id: 1, nombre: 'Miguel de Cervantes',    nacionalidad: 'Española',   fecha_nacimiento: '1547-09-29' },
  { id: 2, nombre: 'Gabriel García Márquez', nacionalidad: 'Colombiana', fecha_nacimiento: '1927-03-06' },
  { id: 3, nombre: 'George Orwell',          nacionalidad: 'Británica',  fecha_nacimiento: '1903-06-25' },
  { id: 4, nombre: 'J. K. Rowling',          nacionalidad: 'Británica',  fecha_nacimiento: '1965-07-31' },
];

const libros = [
  { id: 1, titulo: 'Don Quijote de la Mancha',           autor_id: 1, genero: 'Novela',          estado: 'disponible' },
  { id: 2, titulo: 'Cien años de soledad',               autor_id: 2, genero: 'Realismo mágico', estado: 'disponible' },
  { id: 3, titulo: '1984',                               autor_id: 3, genero: 'Ciencia ficción', estado: 'disponible' },
  { id: 4, titulo: 'Harry Potter y la piedra filosofal', autor_id: 4, genero: 'Fantasía',        estado: 'disponible' },
];

const prestamos = [
  { id: 1, usuario_id: 1, libro_id: 1, fecha_prestamo: '2026-10-01', fecha_devolucion: '2026-10-15' },
  { id: 2, usuario_id: 2, libro_id: 2, fecha_prestamo: '2026-10-05', fecha_devolucion: null },
  { id: 3, usuario_id: 3, libro_id: 3, fecha_prestamo: '2026-10-10', fecha_devolucion: null },
];

export { Usuario, autores, libros, prestamos, usuarios }