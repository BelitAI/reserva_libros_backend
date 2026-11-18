import Libro from "../models/libro.model.js";
import Autor from "../models/autor.model.js";

// ------------------ C (Create) ------------------

// Crear un libro en la base de datos
const create = async (data) => {
    const libro = await Libro.create(data);
    return libro;
};

// ------------------ R (Read) ------------------

// Obtener todos los libros
const getAll = async () => {
    const libros = await Libro.findAll({
        include: {
            model: Autor,
            as: "autor",
            attributes: ["nombre"]
        }
    });

    return libros;
};

// Obtener un libro por su identificador
const getById = async (id) => {
    const libro = await Libro.findByPk(id, {
        include: {
            model: Autor,
            as: "autor",
            attributes: ["nombre"]
        }
    });

    return libro;
};

// ------------------ U (Update) ------------------

// Actualizar un libro en la base de datos
const update = async (id, data) => {
    const libro = await Libro.findByPk(id);

    if (!libro) {
        return null;
    }

    libro.titulo = data.titulo;
    libro.autorId = data.autorId;
    libro.genero = data.genero;

    await libro.save();

    return libro;
};
// ------------------ D (Delete) ------------------

// Eliminar un libro de la base de datos
const remove = async (id) => {
    const libro = await Libro.findByPk(id);

    if (!libro) {
        return null;
    }

    await libro.destroy();

    return libro;
};

export default {
    create,
    getAll,
    getById,
    update,
    remove
};