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
// READ
const getAll = async (req, res) => {
    const usuarios = await userRepository.getAll();
    const mensaje = req.query.mensaje || "";
    const tipoMensaje = req.query.tipoMensaje || "";

    res.render("user/users", {
        usuarios,
        esAdmin: req.session.user.role,
        mensaje,
        tipoMensaje
    });
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


// DELETE USER
const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const usuario = await userRepository.removeUser(id);

        if (!usuario) {
            return redirect(res, "/user/", {
                mensaje: "No se ha encontrado el usuario.",
                tipoMensaje: "error"
            });
        }

        return redirect(res, "/user/", {
            mensaje: "Usuario eliminado correctamente.",
            tipoMensaje: "exito"
        });

    } catch (error) {

        console.error("Error al eliminar usuario:", error);

        if (
            error.name === "SequelizeForeignKeyConstraintError" ||
            error.parent?.code === "23503"
        ) {
            return redirect(res, "/user/", {
                mensaje: "No se puede eliminar este usuario porque tiene préstamos asociados.",
                tipoMensaje: "advertencia"

            });
        }

        return redirect(res, "/user/", {
            mensaje: "Ha ocurrido un error al eliminar el usuario.",
            tipoMensaje: "error"
        });
    }
};

// Mostrar formulario de login
const loginForm = (req, res) => {
    res.render("user/login",{
        error: req.query.error
    });
};


//Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userRepository.loguearse(email);

        if (!user) {
            return redirect(res, "/user/login", { error: "Credenciales incorrectas" });
        }
        const compare = await bcrypt.compare(password, user.contrasena);
        if (!compare) {
            return redirect(res, "/user/login", { error: "Credenciales incorrectas" });
        }
        req.session.user = { userId: user.id, role: user.esAdmin };
        redirect(res, "/libro", { message: "Login exitoso" });
    } catch (error) {
        console.error(error);
        redirect(res, "/user/login", { error: "Ha habido un error en el Login" });
    }

};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error al cerrar sesión");
        }

        return res.redirect("/libro");
    });
};

const toError = (req, res)=>{
    return res.render("user/403");
}

export default {
    createForm,
    getAll,
    getById,
    createUser,
    // updateForm,
    // update,
    deleteUser,
    login,
    loginForm,
    logout,
    toError
}