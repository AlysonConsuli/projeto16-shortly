import db from "../db.js"
import { signupSchema } from "../schemas/authSchema.js"

export const signupMiddleware = async (req, res, next) => {
    const { email } = req.body
    const validation = signupSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        return res.sendStatus(422)
    }
    try {
        const emailConflict = await db.query('SELECT email FROM users WHERE email = $1', [email])
        if (emailConflict.rows[0]) {
            return res.sendStatus(422)
        }
        next()
    } catch {
        res.sendStatus(500)
    }
}