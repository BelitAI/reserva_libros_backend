import { Router } from "express";
import prestamoRouter from "./prestamo.router.js";

const router = Router();

router.use("/prestamo", prestamoRouter);

export default router;
