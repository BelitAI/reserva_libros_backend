import { autores } from "../../models/index.js";

//Mostrar todos los autores

const getAll = (req, res) => {
    res.render("autor/list", { autores });
};


export default{
    getAll
};