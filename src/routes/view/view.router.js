import { Router } from "express";
import userRouter from "./user.router.js";
import autorRouter from "./autor.router.js";
import prestamoRouter from "./prestamo.router.js";
import libroRouter from "./libro.router.js";
import {  } from "./user.router.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { isAdmin } from "../../middlewares/isAdmin.middleware.js";

const router  = Router();

router.use("/user", userRouter);
router.use("/libro", libroRouter);
router.use("/autores", autorRouter)
router.use("/prestamo",isAuthenticated, isAdmin, prestamoRouter);


export default router;