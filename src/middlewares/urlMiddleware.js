import db from "../db.js"
import { urlIdSchema, urlSchema } from "../schemas/urlSchema.js"

export const urlMiddleware = async (req, res, next) => {
    const validation = urlSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(e => e.message))
    }
    next()
}

export const urlIdMiddleware = async (req, res, next) => {
    const { id } = req.params
    const validation = urlIdSchema.validate({ id }, { abortEarly: false })
    if (validation.error) {
        return res.status(422).send(validation.error.details.map(e => e.message))
    }
    try {
        const urlId = await db.query('SELECT id FROM urls WHERE id = $1', [id])
        if (!urlId.rows[0]?.id) {
            return res.status(404).send('Não existe url para esse id!')
        }
        next()
    } catch {
        res.sendStatus(500)
    }
}

export const shortUrlMiddleware = async (req, res, next) => {
    const { shortUrl } = req.params
    try {
        const url = await db.query(`
        SELECT url, "shortUrl" FROM urls 
        WHERE "shortUrl" = $1`, [shortUrl])
        if (!url.rows[0]?.shortUrl) {
            return res.status(404).send('Não existe esse url encurtado!')
        }
        res.locals.url = url.rows[0].url
        next()
    } catch {
        res.sendStatus(500)
    }
}