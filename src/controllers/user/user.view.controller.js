import userRepository from "../../repositories/user.repository.js";
import bcrypt from "bcrypt";

function redirect(res, url, data = {}) {
    const urlSearchParams = new URLSearchParams();
    for (const key in data) {
        urlSearchParams.append(key, data[key]);
    }
    res.redirect(url + "?" + urlSearchParams.toString())
}
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

const loginForm = (req, res) => {
    res.render("user/login");
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("ERERWERWERWERWER", req.body);

    try {
        const user = await userRepository.loguearse(email);
        console.log("USERRRRRR", user.toJSON());

        if (!user) {
            return redirect(res, "/user/login", { error: "Credenciales incorrectas" });
        }
        const compare = await bcrypt.compare(password, user.contrasena);
        if (!compare) {
            return redirect(res, "/user/login", { error: "Credenciales incorrectas" });
        }
        req.session.user = { userId: user.id, role: user.esAdmin };
        redirect(res, "/", { message: "Login exitoso" });
    } catch (error) {
        console.error(error);
        redirect(res, "/user/login", { error: "Ha habido un error en el Login" });
    }

};

export default {
    createForm,
    getAll,
    getById,
    createUser,
    // updateForm,
    // update,
    deleteUser,
    login,
    loginForm
}