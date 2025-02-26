import { Elysia } from 'elysia'
import { getDb } from '../utils/db'

export const users = new Elysia().get('/users', async () => {
    const db = getDb()
    const rows = db.query('SELECT id, email, username FROM users').all()
    return rows
})
