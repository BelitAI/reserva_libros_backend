import { Router } from "express";
import libroViewController from "../../controllers/libro/libro.view.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { isAdmin } from "../../middlewares/isAdmin.middleware.js";

const router = Router();

// ------------------ CRUD de libro ------------------

// ------------------ C (Create) ------------------

// Vista de creación de libro
router.get("/new", isAuthenticated, isAdmin, libroViewController.createForm);

// Crear libro
router.post("/", isAuthenticated, isAdmin, libroViewController.create);

// ------------------ R (Read) ------------------

// Mostrar todos los libros
router.get("/", libroViewController.getAll);

// Mostrar libro individual
router.get("/:id", libroViewController.getById);

// ------------------ U (Update) ------------------

// Actualizar libro
router.post("/:id/edit", isAuthenticated, isAdmin, libroViewController.update);

// Vista de actualización de libro
router.get("/:id/edit", isAuthenticated, isAdmin, libroViewController.updateForm);

// ------------------ D (Delete) ------------------

// Eliminar libro
router.post("/:id/delete", isAuthenticated, isAdmin, libroViewController.remove);

export default router;