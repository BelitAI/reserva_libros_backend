import { libros } from "../../models/index.js";

// ------------------ C (Create) ------------------

// Mostrar formulario de creación
const createForm = (req, res) => {
    res.render("libro/create");
};

// Crear un libro
const create = (req, res) => {
    const { titulo, autor_id, genero } = req.body;

    const id = Math.max(0, ...libros.map(libro => libro.id)) + 1;

    const libro = {
        id,
        titulo,
        autor_id: Number(autor_id),
        genero,
        estado: "disponible"
    };

    libros.push(libro);

    res.redirect("/libro/" + libro.id);
};

// Mostrar todos los libros
const getAll = (req, res) => {
    res.render("libro/list", { libros });
};

// Mostrar un libro por su identificador
const getById = (req, res) => {
    const id = Number(req.params.id);
    const libro = libros.find(libro => libro.id === id);

    res.render("libro/show", { libro });
};

// ------------------ U (Update) ------------------

// Mostrar formulario de edición
const updateForm = (req, res) => {
    const id = Number(req.params.id);
    const libro = libros.find(libro => libro.id === id);

    res.render("libro/update", { libro });
};

// Actualizar los datos de un libro
const update = (req, res) => {
    const id = Number(req.params.id);
    const libro = libros.find(libro => libro.id === id);

    if (!libro) {
        return res.status(404).render("libro/show", { libro });
    }

    const { titulo, autor_id, genero } = req.body;

    libro.titulo = titulo;
    libro.autor_id = Number(autor_id);
    libro.genero = genero;

    res.redirect("/libro/" + libro.id);
};

// ------------------ D (Delete) ------------------

// Eliminar un libro
const remove = (req, res) => {
    const id = Number(req.params.id);
    const posicion = libros.findIndex(libro => libro.id === id);

    if (posicion === -1) {
        return res.status(404).render("libro/show", {
            libro: null
        });
    }

    libros.splice(posicion, 1);

    res.redirect("/libro");
};

export default {
    createForm,
    create,
    getAll,
    getById,
    updateForm,
    update,
    remove
};