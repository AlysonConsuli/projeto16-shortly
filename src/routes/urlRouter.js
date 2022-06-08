import { Router } from "express";
import { postUrl } from "../controllers/urlController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlMiddleware } from "../middlewares/urlMiddleware.js";

const urlRouter = Router()
urlRouter.use(tokenValidation)

urlRouter.post('/urls/shorten', urlMiddleware, postUrl)
export default urlRouter