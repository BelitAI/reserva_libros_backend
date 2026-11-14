import autorRepository from "../../repositories/autor.repository.js";

//Mostrar todos los autores

const getAll = async (req, res) => {
    const autores = await autorRepository.obtenerTodos()
    res.render("autor/list", { autores });
};


//MOSTRAR UN FORMULARIO PARA CREAR UN AUTOR

const createForm = (req, res) => {
    res.render("autor/create");
}

//crear un autor 
const create = async (req, res) => {
 await autorRepository.createAutores(req.body);

    res.redirect("/autores") 
};

export default {
    getAll,
    createForm,
    create
};