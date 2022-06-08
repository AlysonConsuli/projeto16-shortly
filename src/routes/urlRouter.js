import { Router } from "express";
import { deleteUrl, getShortUrl, getUrlId, postUrl } from "../controllers/urlController.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { shortUrlMiddleware, urlIdMiddleware, urlMiddleware, userUrlMiddleware } from "../middlewares/urlMiddleware.js";

const urlRouter = Router()

urlRouter.post('/urls/shorten', urlMiddleware, tokenValidation, postUrl)
urlRouter.get('/urls/:id', urlIdMiddleware, getUrlId)
urlRouter.get('/urls/open/:shortUrl', shortUrlMiddleware, getShortUrl)
urlRouter.delete('/urls/:id', tokenValidation, urlIdMiddleware, userUrlMiddleware, deleteUrl)
export default urlRouter