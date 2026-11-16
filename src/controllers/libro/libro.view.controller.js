import libroRepository from "../../repositories/libro.repository.js";
import Autor from "../../models/autor.model.js";

// ------------------ C (Create) ------------------

// Mostrar formulario de creación
const createForm = async (req, res) => {
    try {
        const autores = await Autor.findAll({
            order: [["nombre", "ASC"]]
        });

        res.render("libro/create", { autores });

    } catch (error) {
        console.error("Error al obtener los autores:", error);
        res.status(500).send("Error al cargar el formulario");
    }
};

// Crear un libro
const create = async (req, res) => {
    const { titulo, autor_id, genero } = req.body;

    const libro = await libroRepository.create({
        titulo,
        autorId: Number(autor_id),
        genero,
        estado: "disponible"
    });

    res.redirect("/libro/" + libro.id);
};

// Mostrar todos los libros
const getAll = async (req, res) => {
    const libros = await libroRepository.getAll();

    res.render("libro/list", { libros });
};

// Mostrar un libro por su identificador
const getById = async (req, res) => {
    const id = Number(req.params.id);
    const libro = await libroRepository.getById(id);

    res.render("libro/show", { libro });
};

// ------------------ U (Update) ------------------

// Mostrar formulario de edición
const updateForm = async (req, res) => {
    try {
        const id = Number(req.params.id);

        // Buscar el libro que queremos editar
        const libro = await libroRepository.getById(id);

        if (!libro) {
            return res.status(404).send("Libro no encontrado");
        }

        // Obtener todos los autores de PostgreSQL
        const autores = await Autor.findAll({
            order: [["nombre", "ASC"]]
        });

        // Enviar el libro y los autores a la vista
        res.render("libro/update", { libro, autores });

    } catch (error) {
        console.error("Error al cargar el formulario:", error);
        res.status(500).send("Error al cargar el formulario");
    }
};

// Actualizar los datos de un libro
const update = async (req, res) => {
    const id = Number(req.params.id);
    const { titulo, autor_id, genero } = req.body;

    const libro = await libroRepository.update(id, {
        titulo,
        autorId: Number(autor_id),
        genero
    });

    if (!libro) {
        return res.status(404).render("libro/show", { libro });
    }

    res.redirect("/libro/" + libro.id);
};

// ------------------ D (Delete) ------------------

// Eliminar un libro
const remove = async (req, res) => {
    const id = Number(req.params.id);
    const libro = await libroRepository.remove(id);

    if (!libro) {
        return res.status(404).render("libro/show", {
            libro: null
        });
    }

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