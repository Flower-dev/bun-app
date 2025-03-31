import { Database } from 'bun:sqlite'

const db = new Database('database.sqlite', { create: true })

export function createTable() {
    const query = db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `)
    query.run()
}

export function getDb() {
    return db
}
