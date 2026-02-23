import { Router } from "express";
import UserModel from "../models/UserModel.js";
import { login,profile } from "../controllers/authController.js";
import { validateToken } from "../midlleware/validateTokenMiddleware.js";

const router = Router();

router.post('/login',login);
router.get('/profile',validateToken,profile);

export default router;