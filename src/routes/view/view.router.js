import { Router } from "express";
import autorRouter from "./autor.router.js";

const router = Router();

router.use("/autores", autorRouter);

export default router;