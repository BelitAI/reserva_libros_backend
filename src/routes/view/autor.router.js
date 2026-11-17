import { Router } from "express";
import autorController from "../../controllers/autor/autor.view.controller.js"; 
import { isAuthenticated  } from "../../middlewares/auth.middleware.js";
import { isAdmin  } from "../../middlewares/isAdmin.middleware.js";


const router = Router();

// Mostrar todos los autores
router.get("/", autorController.getAll);


//Mostrar formulario para crear un autor
router.get("/nuevo", isAuthenticated, isAdmin, autorController.createForm);


//Creeamos un nuevo autor
router.post("/", autorController.create);


//MOSTRAR UN FORMULARIO PARA EDITAR UN AUTOR
router.get("/editar/:id", isAuthenticated, isAdmin, autorController.editForm);

//ACTUALIZAR UN AUTOR
router.post("/editar/:id", isAuthenticated, isAdmin, autorController.update);

//ELIMINAR UN AUTOR
router.get("/eliminar/:id", isAuthenticated, isAdmin, autorController.remove);

//MOSTRAR LIBROS DE LOS AUTORES
router.get("/autor/:id", autorController.getById);

export default router;