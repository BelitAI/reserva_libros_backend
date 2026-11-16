import { Router } from "express";
import libroViewController from "../../controllers/libro/libro.view.controller.js";

const router = Router();

// ------------------ CRUD de libro ------------------

// ------------------ C (Create) ------------------

// Vista de creación de libro
router.get("/new", libroViewController.createForm);

// Crear libro
router.post("/", libroViewController.create);

// ------------------ R (Read) ------------------

// Mostrar todos los libros
router.get("/", libroViewController.getAll);

// Mostrar libro individual
router.get("/:id", libroViewController.getById);

// ------------------ U (Update) ------------------

// Actualizar libro
router.post("/:id/edit", libroViewController.update);

// Vista de actualización de libro
router.get("/:id/edit", libroViewController.updateForm);

// ------------------ D (Delete) ------------------

// Eliminar libro
router.post("/:id/delete", libroViewController.remove);

export default router;