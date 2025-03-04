import { Elysia, t } from 'elysia'
import bcrypt from 'bcrypt'
import { getDb } from '../utils/db'

const registerSchema = t.Object({
    username: t.String(),
    email: t.String(),
    password: t.String(),
})

export const register = new Elysia({ prefix: '/auth' }).post(
    '/register',
    async ({ body }) => {
        try {
            const db = getDb()
            const { username, email, password } = body as {
                username: string
                email: string
                password: string
            }

            if (!username.trim() || !email.trim() || !password.trim()) {
                return { status: 400, error: 'All fields are required' }
            }

            if (username.toLowerCase() === email.toLowerCase()) {
                return {
                    status: 400,
                    error: 'Username and email cannot be identical',
                }
            }

            const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            if (!passwordRegex.test(password)) {
                return {
                    status: 400,
                    error: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
                }
            }

            const existingUser = db
                .query('SELECT * FROM users WHERE username = ?')
                .get(username)
            if (existingUser) {
                return { status: 409, error: 'Username already exists' }
            }

            const existingEmail = db
                .query('SELECT * FROM users WHERE email = ?')
                .get(email)
            if (existingEmail) {
                return { status: 409, error: 'Email already exists' }
            }

            const saltRounds = 10
            const password_hash = await bcrypt.hash(password, saltRounds)

            db.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
            ).run(username, email, password_hash)

            return { status: 201, message: 'User created successfully' }
        } catch (error) {
            console.error('Error creating user:', error)
            return { status: 500, error: 'Internal server error' }
        }
    },
    { body: registerSchema }
)
