import { usuarios } from "../../models/index.js";

const createForm = (req, res) => {
    res.render("user/newUser");
};

const createUser = (req, res) => {
    const { nombre, apellidos, mail, contrasena } = req.body;
    const id = usuarios[usuarios.length - 1].id + 1
    const nuevoUsuario = {
        id,
        nombre,
        apellidos,
        mail,
        contrasena
    }
    usuarios.push(nuevoUsuario);
    res.redirect("/user/");

};


// READ
const getAll = (req, res) => {
    res.render("user/users", { usuarios });
};

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id)
    res.render("user/infoUser", { usuario })
};


// UPDATE
const updateForm = (req, res) => {
    // Mostrar formulario de edición
};

const update = (req, res) => {
    // Actualizar usuario
};


// DELETE
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice !== -1) {
        usuarios.splice(indice, 1);
    }
    res.redirect("/user/");
};

const loginForm = (req, res) => {
    res.render("user/login");
};

const login = (req, res) => {
    const { email, password } = req.body;
    const usuario = usuarios.find(usuario =>
        usuario.mail === email && usuario.contrasena === password
    );
    if (!usuario) {
        return res.send("Email o constraseña incorrectos");
    }
    res.send(`Bienvenido ${usuario.nombre} ${usuario.contrasena}`)
};

export default {
    createForm,
    createUser,
    getAll,
    getById,
    updateForm,
    update,
    deleteUser,
    login,
    loginForm
}