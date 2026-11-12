import { Router } from "express";
import prestamoViewController from "../../controllers/prestamo/prestamo.view.controller.js";

const router = Router();

// ------------------ CRUD de préstamo ----------------------------

// ------------------ C (Create)
// vista de formulario
router.get("/new", prestamoViewController.createForm);

// creación de dato
router.post("/", prestamoViewController.create);

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/", prestamoViewController.getAll);

// endpoint dato individual
router.get("/:id", prestamoViewController.getById);

// ---------------- U (Update) -----------------------------------
// vista de actualización de préstamo
router.get("/:id/edit", prestamoViewController.updateForm);

// endpoint para cambiar dato por completo
router.post("/:id/edit", prestamoViewController.update);

// ------------------------ D (Delete)------------
router.post("/:id/delete", prestamoViewController.remove);


export default router;