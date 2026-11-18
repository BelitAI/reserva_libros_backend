import Autor from "../models/autor.model.js";
import Libro from "../models/libro.model.js";

//LECTURA DE AUTORES (TABLA)
const obtenerTodos = async () => {
    const autores = await Autor.findAll({ 
        order: [["id", "ASC"]]
    });
    return autores;

};

//CREAR UN AUTOR
const createAutores = async (datosAutor) => {

   const nuevoAutor = await Autor.create({
        nombre: datosAutor.nombre,
        nacionalidad: datosAutor.nacionalidad,
        fechaNacimiento: datosAutor.fecha_nacimiento
   });

   return nuevoAutor;

};

//Buscar un autor por ID
const obtenerPorId = async (id) =>{
    const autor = await Autor.findByPk(id, { 
        include: [{
            model: Libro,
            as: "libros"
        }]
    });
    
    return autor;
}

//ACTUALIZAR AUTOR
const actualizarAutor = async (id, datosAutor) => {

    const autor = await Autor.findByPk(id);
    
    if (!autor) {
        return null;
    }

    await autor.update({
        nombre: datosAutor.nombre,
        nacionalidad: datosAutor.nacionalidad,
        fechaNacimiento: datosAutor.fecha_nacimiento
    });

    return autor;
};
 
//ELIMINAR UN AUTOR
const eliminarAutor = async (id) => {

    const autor = await Autor.findByPk(id);

    if(!autor) {
        return null;
    }

    await autor.destroy();

    return autor;
};



export default {
    obtenerTodos,
    createAutores,
    actualizarAutor,
    obtenerPorId,
    eliminarAutor
};