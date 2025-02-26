import { Elysia } from 'elysia'
import bcrypt from 'bcrypt'
import { getDb } from '../utils/db'

export const register = new Elysia().post('/register', async ({ body }) => {
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
