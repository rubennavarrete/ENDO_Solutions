import { Router } from "express";
import { login } from "../controllers/login.controller.js";

const router = Router();

router.post('/', login);
// router.post('/recuperar', forgotPassword);

export default router;