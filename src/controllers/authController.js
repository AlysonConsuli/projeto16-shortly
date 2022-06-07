import db from "../db.js";
import bcrypt from "bcrypt";

export const postUser = async (req, res) => {
    const { name, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    try {
        await db.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)`, [name, email, hashedPassword])
        res.sendStatus(201)
    } catch {
        res.sendStatus(500)
    }
}