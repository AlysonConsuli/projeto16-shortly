import { Router } from "express";
import { postSignin, postUser } from "../controllers/authController.js";
import { signinMiddleware, signupMiddleware } from "../middlewares/authController.js";

const authRouter = Router()

authRouter.post('/signup', signupMiddleware, postUser)
authRouter.post('/signin', signinMiddleware, postSignin)
export default authRouter