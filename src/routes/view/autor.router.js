import { Router } from "express";
import autorController from "../../controllers/autor/autor.view.controller.js";

const router = Router();

// Mostrar todos los autores
router.get("/", autorController.getAll);

//Mostrar formulario para crear un autor
router.get("/nuevo", autorController.createForm);

//Creeamos un nuevo autor
router.post("/", autorController.create);

export default router;