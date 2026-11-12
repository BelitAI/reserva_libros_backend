import { autores } from "../../models/index.js";

//Mostrar todos los autores

const getAll = (req, res) => {
    res.render("autor/list", { autores });
};


//MOSTRAR UN FORMULARIO PARA CREAR UN AUTOR

const createForm = (req, res) => {
    res.render("autor/create");
}

//crear un autor 
const create = (req, res) =>{
    const id = autores[autores.length - 1].id + 1;

    const{ nombre, nacionalidad, fecha_nacimiento } = req.body;

    const nuevoAutor = {
        id,
        nombre,
        nacionalidad,
        fecha_nacimiento
    };

    autores.push(nuevoAutor);

    res.redirect("/autores")
};

export default{
    getAll,
    createForm,
    create
};