import autorRepository from "../../repositories/autor.repository.js";

// MOSTRAR TODOS LOS AUTORES
const getAll = async (req, res) => {
    const autores = await autorRepository.obtenerTodos();
    
    const mensaje = req.query.mensaje || "";

    res.render("autor/list", { autores, mensaje });
};

// MOSTRAR FORMULARIO PARA CREAR UN AUTOR
const createForm = (req, res) => {
    res.render("autor/create");
};

// CREAR UN AUTOR
const create = async (req, res) => {
    await autorRepository.createAutores(req.body);

    res.redirect("/autores");
};

// MOSTRAR FORMULARIO PARA EDITAR UN AUTOR
const editForm = async (req, res) => {
    const autor = await autorRepository.obtenerPorId(req.params.id);

    if (!autor) {
        return res.status(404).send("Autor no encontrado");
    }

    res.render("autor/edit", { autor });
};

// ACTUALIZAR UN AUTOR
const update = async (req, res) => {
    const autor = await autorRepository.actualizarAutor(req.params.id, req.body);

    if (!autor) {
        return res.status(404).send("Autor no encontrado");
    }

    res.redirect("/autores");
};

// ELIMINAR UN AUTOR
const remove = async (req, res) => {
    try {
        const autor = await autorRepository.eliminarAutor(req.params.id);

        if (!autor) {
            return res.status(404).send("Autor no encontrado");
        }

        res.redirect("/autores");

    } catch (error) {

        // Comprobamos si el autor tiene libros asociados
        if (error.name === "SequelizeForeignKeyConstraintError") {
            const mensaje = "No se puede eliminar este autor porque tiene libros asociados.";

            return res.redirect(`/autores?mensaje=${encodeURIComponent(mensaje)}`);
        }

        // Si ocurre otro error, lo mostramos en la consola
        console.error("Error al eliminar el autor:", error);
        res.status(500).send("Error al eliminar el autor");
    }
};

//libros de los autores
const getById = async (req, res) => {
    const idAutor = parseInt(req.params.id);
    const autor = await autorRepository.obtenerPorId(idAutor);
    res.render("autor/autor-libros", { autor });
};

// EXPORTAR CONTROLADORES
export default {
    getAll,
    createForm,
    create,
    editForm,
    update,
    remove,
    getById
};