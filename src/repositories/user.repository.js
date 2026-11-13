import Usuario from "../models/user.model.js";

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async () => {
    const users = await Usuario.findAll();
    return users;
};

//get by id

const getById = async (id) => {
    const user = await Usuario.findByPk(id);
    return user;
}

const createUser = async (data) => {
    console.log(data);
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

export default {
    getAll,
    getById,
    createUser,
    removeUser
}