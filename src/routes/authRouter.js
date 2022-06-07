import { Router } from "express";
import { postUser } from "../controllers/authController.js";
import { signupMiddleware } from "../middlewares/authController.js";

const authRouter = Router()

authRouter.post('/signup', signupMiddleware, postUser)
export default authRouter