import { Router } from "express";
import viewRouter from "./view/view.router.js";
import apiRouter from "./api/api.router.js";


const router  = Router();

router.use("/api", apiRouter);
router.use("/",viewRouter);

export default router;
