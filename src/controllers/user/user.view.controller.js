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
     // Recuperamos el mensaje que llega por la URL
    const mensaje = req.query.mensaje || "";
    res.render("user/users", { usuarios, mensaje });
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

    try {

        // Intentamos eliminar el usuario
        const usuario = await userRepository.removeUser(id);

        // Comprobamos si existe
        if (!usuario) {
            return res.redirect(
                `/user?mensaje=${encodeURIComponent("No se ha encontrado el usuario.")}`
            );
        }

        // Si todo ha salido bien
        res.redirect(
            `/user?mensaje=${encodeURIComponent("Usuario eliminado correctamente")}`
        );

    } catch (error) {

        // Comprobamos si el error se debe a una relación con préstamos
        if (error.name === "SequelizeForeignKeyConstraintError") {

            return res.redirect(
                `/user?mensaje=${encodeURIComponent("No se puede eliminar este usuario porque tiene préstamos asociados.")}`
            );
        }

        // Otros errores
        console.error("Error al eliminar usuario:", error);

        res.redirect(
            `/user?mensaje=${encodeURIComponent("Ha ocurrido un error al eliminar el usuario.")}`
        );
    }
};

const loginForm = (req, res) => {
    res.render("user/login");
};

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
        redirect(res, "/user", { message: "Login exitoso" });
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
    logout
}