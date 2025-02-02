import { Elysia } from 'elysia'

import { Database } from 'bun:sqlite'

const bouh = () => {
    return 'Hello Bouh'
}

const login = () => {
    return 'toto test'
}

const init = () => {
    const db = new Database('mydb.sqlite')
    const query = db.query(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			email TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL
    	)`)
    return query.run()
    // const query = db.query("select 'Hello world' as message;");
    // return query.get(); // => { message: "Hello world" }
}

const app = new Elysia()
    .get('/', bouh)
    .get('/login', login)
    .get('/init', init)
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
