import autorRepository from "../../repositories/autor.repository.js";

// MOSTRAR TODOS LOS AUTORES
const getAll = async (req, res) => {
    const autores = await autorRepository.obtenerTodos();
    res.render("autor/list", { autores });
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

//ELIMINAR UN AUTOR

const remove = async (req, res) => {
    const autor = await autorRepository.eliminarAutor(req.params.id);

    if(!autor) {
        return res.status(404).send("Autor no encontrado");
    }

    res.redirect("/autores");
};


// EXPORTAR CONTROLADORES
export default {
    getAll,
    createForm,
    create,
    editForm,
    update,
    remove
};