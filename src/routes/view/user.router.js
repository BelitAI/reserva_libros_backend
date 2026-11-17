import { Router } from "express";
import userViewController from "../../controllers/user/user.view.controller.js"
const router = Router();
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { isAdmin } from "../../middlewares/isAdmin.middleware.js";

// // ------------------ C (Create) ------------------

// // Vista de creación
router.get("/new",userViewController.createForm);

// // Crear usuario
router.post("/new", userViewController.createUser);
// // ------------------ LOGIN ------------------

// // Vista de login
router.get("/login", userViewController.loginForm);

// // Comprobar login
router.post("/login", userViewController.login);
// logout
router.post("/logout", userViewController.logout);

// // ------------------ R (Read) ------------------

// // Mostrar todos los usuarios
router.get("/", isAuthenticated, isAdmin, userViewController.getAll);

// // Mostrar usuario individual
router.get("/:id", isAuthenticated, isAdmin, userViewController.getById);


// // ------------------ U (Update) ------------------

// // Vista de actualización
// router.get("/:id/edit", userViewController.updateForm);

// // Actualizar usuario
// router.post("/:id/edit", userViewController.update);


// // ------------------ D (Delete) ------------------

// // Eliminar usuario
router.post("/:id/delete", userViewController.deleteUser);





export default router;