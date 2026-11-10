
BEGIN;

-- ---------------------------------------------------------------------
-- Limpiar las tablas y reiniciar los IDs
-- ---------------------------------------------------------------------
TRUNCATE TABLE public.prestamos,
               public.libros,
               public.autor,
               public.usuarios
RESTART IDENTITY CASCADE;


-- ---------------------------------------------------------------------
-- Usuarios
-- ---------------------------------------------------------------------
INSERT INTO public.usuarios (nombre, apellidos, mail, contrasena, es_admin)
VALUES
('Juan', 'García López', 'juan@gmail.com', '123456', false),
('María', 'Fernández Pérez', 'maria@gmail.com', '123456', true),
('Pedro', 'Martínez Ruiz', 'pedro@gmail.com', '123456', false),
('Laura', 'Sánchez Gómez', 'laura@gmail.com', '123456', false);


-- ---------------------------------------------------------------------
-- Autores
-- ---------------------------------------------------------------------
INSERT INTO public.autor (nombre, nacionalidad, fecha_nacimiento)
VALUES
('Miguel de Cervantes', 'Española', '1547-09-29'),
('Gabriel García Márquez', 'Colombiana', '1927-03-06'),
('George Orwell', 'Británica', '1903-06-25'),
('J. K. Rowling', 'Británica', '1965-07-31');


-- ---------------------------------------------------------------------
-- Libros
-- ---------------------------------------------------------------------
INSERT INTO public.libros (titulo, autor_id, genero, estado)
VALUES
('Don Quijote de la Mancha', 1, 'Novela', 'disponible'),
('Cien años de soledad', 2, 'Realismo mágico', 'disponible'),
('1984', 3, 'Ciencia ficción', 'disponible'),
('Harry Potter y la piedra filosofal', 4, 'Fantasía', 'disponible');


-- ---------------------------------------------------------------------
-- Préstamos
-- ---------------------------------------------------------------------
INSERT INTO public.prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion)
VALUES
(1, 1, '2026-10-01', '2026-10-15'),
(2, 2, '2026-10-05', NULL),
(3, 3, '2026-10-10', NULL);


COMMIT;---------------------------------------------------------------
--  Consultas de comprobación (opcionales)
-- ---------------------------------------------------------------------
-- Héroes con su creador y sus poderes:
--   SELECT h.name AS heroe, u.username AS creador,
--          STRING_AGG(p.name, ', ' ORDER BY p.name) AS poderes
--   FROM heroes h
--   JOIN users u            ON u.id = h.user_id
--   LEFT JOIN hero_powers hp ON hp.hero_id = h.id
--   LEFT JOIN powers p       ON p.id = hp.power_id
--   GROUP BY h.id, u.username
--   ORDER BY h.id;
--
-- Poderes y cuántos héroes los tienen (incluye los que no tiene nadie):
--   SELECT p.name, COUNT(hp.hero_id) AS num_heroes
--   FROM powers p
--   LEFT JOIN hero_powers hp ON hp.power_id = p.id
--   GROUP BY p.id
--   ORDER BY num_heroes DESC;