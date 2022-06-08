import db from "../db.js"
import { urlSchema } from "../schemas/urlSchema.js"

export const urlMiddleware = async (req, res, next) => {
    const { url } = req.body
    const validation = urlSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(e => e.message))
    }
    next()
}