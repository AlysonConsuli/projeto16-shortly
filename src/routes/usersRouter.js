import { Router } from "express";
import { getUsers } from "../controllers/usersController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { usersMiddleware } from "../middlewares/usersMiddleware.js";

const usersRouter = Router()

usersRouter.get('/users/:id', tokenValidation, usersMiddleware, getUsers)
export default usersRouter