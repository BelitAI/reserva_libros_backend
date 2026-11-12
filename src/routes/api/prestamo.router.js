import { Router } from "express";
import prestamoApiController from "../../controllers/prestamo/prestamo.api.controller.js";

const router = Router();

// ------------------ CRUD de préstamo ----------------------------

// ------------------ C (Create)
router.post("/", prestamoApiController.create);

// ------------------ R (Read)---------------------------------------------
router.get("/", prestamoApiController.getAll);
router.get("/:id", prestamoApiController.getById);

// ---------------- U (Update) -----------------------------------
router.put("/:id", prestamoApiController.update);
router.patch("/:id", prestamoApiController.modify);

// ------------------------ D (Delete)------------
router.delete("/:id", prestamoApiController.remove);


export default router;