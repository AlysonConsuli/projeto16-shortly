import bcrypt from 'bcrypt'

import db from "../db.js"
import { signinSchema, signupSchema } from "../schemas/authSchema.js"

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

export const signinMiddleware = async (req, res, next) => {
    const { email, password } = req.body
    const validation = signinSchema.validate(req.body, { abortEarly: false })
    if (validation.error) {
        return res.sendStatus(422)
    }
    try {
        const user = await db.query('SELECT id, email, password FROM users WHERE email = $1', [email])
        if (!user.rows[0]?.email || !bcrypt.compareSync(password, user.rows[0]?.password)) {
            return res.sendStatus(401)
        }
        delete user.rows[0].password
        res.locals.user = user.rows[0]
        next()
    } catch {
        res.sendStatus(500)
    }
}