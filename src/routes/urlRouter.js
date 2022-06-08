import { Router } from "express";
import { getUrlId, postUrl } from "../controllers/urlController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { urlIdMiddleware, urlMiddleware } from "../middlewares/urlMiddleware.js";

const urlRouter = Router()

urlRouter.post('/urls/shorten', urlMiddleware, tokenValidation, postUrl)
urlRouter.get('/urls/:id', urlIdMiddleware, getUrlId)
export default urlRouter