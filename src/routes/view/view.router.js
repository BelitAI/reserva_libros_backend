import { Router } from "express";
import userRouter from "./user.router.js";
import autorRouter from "./autor.router.js";
import {  } from "./user.router.js";

const router  = Router();

router.use("/user", userRouter);
router.use("/autores", autorRouter)



export default router;