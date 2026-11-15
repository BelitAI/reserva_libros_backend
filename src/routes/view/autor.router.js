import { Router } from "express";
import autorController from "../../controllers/autor/autor.view.controller.js";

const router = Router();

// Mostrar todos los autores
router.get("/", autorController.getAll);


//Mostrar formulario para crear un autor
router.get("/nuevo", autorController.createForm);


//Creeamos un nuevo autor
router.post("/", autorController.create);


//MOSTRAR UN FORMULARIO PARA EDITAR UN AUTOR
router.get("/editar/:id", autorController.editForm);

//ACTUALIZAR UN AUTOR
router.post("/editar/:id", autorController.update);

//ELIMINAR UN AUTOR
router.get("/eliminar/:id", autorController.remove);

export default router;