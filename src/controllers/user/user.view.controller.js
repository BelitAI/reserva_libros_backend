import userRepository from "../../repositories/user.repository.js";

const createForm = (req, res) => {
    res.render("user/newUser");
};

const createUser = async (req, res) => {
    const { nombre, apellidos, mail, contrasena } = req.body;
    await userRepository.createUser(req.body);
    res.redirect("/user/");

};


// READ
const getAll = async (req, res) => {
    const usuarios = await userRepository.getAll();
    res.render("user/users", { usuarios });
};

const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = await userRepository.getById(id)
    res.render("user/infoUser", { usuario })
};



// // UPDATE
// const updateForm = (req, res) => {
//     // Mostrar formulario de edición
// };

// const update = (req, res) => {
//     // Actualizar usuario
// };


// DELETE
const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await userRepository.removeUser(id)
    res.redirect("/user/");
};

// const loginForm = (req, res) => {
//     res.render("user/login");
// };

// const login = (req, res) => {
//     const { email, password } = req.body;
//     const usuario = usuarios.find(usuario =>
//         usuario.mail === email && usuario.contrasena === password
//     );
//     if (!usuario) {
//         return res.send("Email o constraseña incorrectos");
//     }
//     res.send(`Bienvenido ${usuario.nombre} ${usuario.contrasena}`)
// };

export default {
    createForm,
    getAll,
    getById,
    createUser,
    // updateForm,
    // update,
    deleteUser,
    // login,
    // loginForm
}