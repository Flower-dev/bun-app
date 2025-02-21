import { Elysia, t } from 'elysia'
import bcrypt from 'bcrypt'
import { createTable, getDb } from './utils/db'

const app = new Elysia()

const customBody = t.Object({
    email: t.String(),
    password: t.String(),
})

app.onError(({ code, error }) => {
    console.error(`${code}: ${error?.toString()}`)
    return {
        error: 'Internal server error',
        code,
    }
})

    .get('/', async () => {
        try {
            const db = getDb()
            const rows = db.query('SELECT id, email, username FROM users').all()
            return rows
        } catch (error) {
            console.error('Error fetching users:', error)
            return { error: 'Internal server error' }
        }
    })

    .post('/register', async ({ body }) => {
        try {
            const db = getDb()
            const { username, email, password } = body as {
                username: string
                email: string
                password: string
            }

            if (!username || !email || !password) {
                return { error: 'All fields are required' }
            }

            // Hash pwd
            const saltRounds = 10
            const password_hash = await bcrypt.hash(password, saltRounds)

            db.run(
                'INSERT INTO users (id, username, email, password) VALUES (NULL,?, ?, ?)',
                [username, email, password_hash]
            )

            return { message: 'User created successfully' }
        } catch (error) {
            console.error('Error creating user:', error)
            return { error: 'Internal server error' }
        }
    })

    .post(
        '/login',
        ({ body }) => {
            return body
        },
        {
            body: customBody,
        }
    )

    .listen(3000, async () => {
        await createTable()
        console.log('Server is running on http://localhost:3000')
    })
