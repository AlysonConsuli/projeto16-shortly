import db from "../db.js";

export const getUsers = async (req, res) => {
    const { id } = req.params
    const { name } = res.locals
    try {
        const user = await db.query(`
        SELECT SUM("visitCount") AS "visitCount"
        FROM urls
        WHERE "userId" = $1`, [id])
        const urls = await db.query(`
        SELECT id, "shortUrl", url, "visitCount"
        FROM urls u
        WHERE u."userId" = $1`, [id])
        const visitCount = Number(user.rows[0].visitCount)
        const userUrls = {
            id: Number(id),
            name,
            visitCount,
            shortenedUrls: urls.rows
        }
        res.send(userUrls)
    } catch {
        res.sendStatus(500)
    }
}

export const getRanking = async (req, res) => {
    try {
        const ranking = await db.query(`
        SELECT users.id, users.name, 
        COUNT(urls.id) AS "linksCount", 
        COALESCE(SUM(urls."visitCount"),0) AS "visitCount"
        FROM users
        LEFT JOIN urls ON urls."userId"=users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10`)
        ranking.rows.forEach(obj => {
            obj.linksCount = Number(obj.linksCount)
            obj.visitCount = Number(obj.visitCount)
        })
        res.send(ranking.rows)
    } catch {
        res.sendStatus(500)
    }
}