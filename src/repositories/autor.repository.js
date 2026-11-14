import Autor from "../models/autor.model.js";

//LECTURA DE AUTORES (TABLA)
const obtenerTodos = async () => {
    const autores = await Autor.findAll();
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
 
export default {
    obtenerTodos,
    createAutores
};