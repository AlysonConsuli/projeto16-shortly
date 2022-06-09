import { Router } from "express";
import { getRanking, getUsers } from "../controllers/usersController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { usersMiddleware } from "../middlewares/usersMiddleware.js";

const usersRouter = Router()

usersRouter.get('/users/:id', tokenValidation, usersMiddleware, getUsers)
usersRouter.get('/ranking', getRanking)
export default usersRouter