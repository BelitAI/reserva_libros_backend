import { Router } from "express";
import autorController from "../../controllers/autor/autor.view.controller.js";

const router = Router();

// Mostrar todos los autores
router.get("/", autorController.getAll);

export default router;