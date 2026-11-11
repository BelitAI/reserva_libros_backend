import { Router } from "express";
import viewRouter from "./view/view.router.js";


const router  = Router();

router.use("/",viewRouter);

export default router;