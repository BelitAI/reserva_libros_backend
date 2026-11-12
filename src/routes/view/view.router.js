import { Router } from "express";
// import userRouter from "./user.router.js";
// import autorRouter from "./autor.router.js";
import prestamoRouter from "./prestamo.router.js";

const router = Router();

// router.use("/user", userRouter);
// router.use("/autores", autorRouter);
router.use("/prestamo", prestamoRouter);



export default router;