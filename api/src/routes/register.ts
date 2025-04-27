import { Elysia, t } from 'elysia'
import { hashSync } from 'bcrypt'
import { getDb } from '../utils/db'
import { jwtPlugin } from '../config/jwt'

const registerQuery = t.Object({
    email: t.String({
        format: 'email',
        error: 'A valid email is required',
    }),
    password: t.String({
        minLength: 6,
        error: 'Password must contain at least 6 characters',
    }),
    username: t.String({
        minLength: 3,
        error: 'Username must contain at least 3 characters',
    }),
})

export const register = new Elysia({ prefix: '/auth' }).use(jwtPlugin).post(
    '/register',
    async ({ body, set, jwt, cookie: { auth } }) => {
        const db = getDb()
        try {
            const userQuery = db.prepare('SELECT * FROM users WHERE email = ?')
            const existingUser = userQuery.get(body.email)

            if (existingUser) {
                set.status = 400
                return {
                    success: false,
                    message: 'This email is already in use',
                }
            }

            const hashedPassword = hashSync(body.password, 10)
            const insertUserQuery = db.prepare(
                'INSERT INTO users (email, password, username) VALUES (?, ?, ?)'
            )
            const result = insertUserQuery.run(
                body.email,
                hashedPassword,
                body.username
            )
            const userId = Number(result.lastInsertRowid)

            const token = await jwt.sign({
                userId,
                email: body.email,
                username: body.username,
            })

            auth.set({
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 86400, // 7 days
            })

            set.status = 201
            return {
                success: true,
                user: {
                    id: userId,
                    email: body.email,
                    username: body.username,
                },
            }
        } catch (error) {
            console.error('Error during registration:', error)
            console.error(
                'Stack trace:',
                error instanceof Error ? error.stack : 'No stack trace'
            )
            set.status = 500
            return {
                success: false,
                message:
                    error instanceof Error ? error.message : 'Server error',
            }
        }
    },
    {
        body: registerQuery,
        response: t.Object({
            success: t.Boolean(),
            user: t.Optional(
                t.Object({
                    id: t.Number(),
                    email: t.String(),
                    username: t.String(),
                })
            ),
            message: t.Optional(t.String()),
        }),
    }
)
