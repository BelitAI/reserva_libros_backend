import Usuario from "../models/user.model.js";
import Prestamo from "../models/prestamo.model.js";
import Libro from "../models/libro.model.js";
import Autor from "../models/autor.model.js"

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async () => {
    const users = await Usuario.findAll({
        order: [["id", "ASC"]]
    });
    return users;
};

//get by id

const getById = async (id) => {
    const user = await Usuario.findByPk(id, {
        include: [{
            model: Prestamo,//el modelo en si 
            as: "prestamos",//indica el alias de la asociación que hemos definido en Sequelize.
            include: [{//este include ya es dentro de prestamos o sea su relacion con libros
                model: Libro,
                as: "libro",
                include: [{
                    model: Autor,
                    as: "autor"
                }]
            }]
        }]
    });

    return user;
}

const createUser = async (data) => {
    await Usuario.create(data);
}

const removeUser = async (id) => {
    const user = await Usuario.findByPk(id);
    if (user) {
        await user.destroy();
        return user;
    }
    return null;
}

const loguearse = async (email) => {
    const user = await Usuario.findOne({
        where: {
            mail: email
        }
    });
    return user;
};

export default {
    getAll,
    getById,
    createUser,
    removeUser,
    loguearse
}