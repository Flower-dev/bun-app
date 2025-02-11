import { Database } from 'bun:sqlite'

const db = new Database('database.sqlite')

export async function createTable() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `)
}

export function getDb() {
    return db
}
