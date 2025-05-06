import { Database } from 'bun:sqlite'

const db = new Database('database.sqlite', { create: true })

export function createTable() {
    const query = db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS feeds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS user_feed (
            user_id INTEGER,
            feed_id INTEGER,
            PRIMARY KEY (user_id, feed_id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (feed_id) REFERENCES feeds(id)
        );

        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            author TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            link TEXT NOT NULL
        );

    `)
    query.run()
}

export function getDb() {
    return db
}
